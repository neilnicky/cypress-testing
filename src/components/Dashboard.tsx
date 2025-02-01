"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import React from "react";

// Set a fixed seed for faker to ensure consistent data generation
faker.seed(123);

// Generate mock product data
const generateInitialProducts = (count = 50) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    image: `/api/placeholder/400/320`,
  }));
};

// Generate initial products outside component to ensure consistency
const initialProducts = generateInitialProducts(10);

const DashboardPage = () => {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = React.useState(initialProducts);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  // Get unique categories from initial products
  const categories = React.useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const filteredProducts = React.useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      }),
    [products, searchTerm, selectedCategory]
  );

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show loading while checking authentication
  }

  // Generate new products with new seed for refresh
  const handleRefresh = () => {
    faker.seed(Date.now()); // New seed for each refresh
    setProducts(generateInitialProducts(10));
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1">
              <Label>Search Products</Label>
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="product-search"
              />
            </div>
            <div className="w-full md:w-64">
              <Label>Filter by Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                data-testid="category-filter"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleRefresh} data-testid="refresh-products">
                Refresh Data
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} data-testid={`product-card-${product.id}`}>
                <CardContent className="p-4">
                  <div className="relative w-full h-40 mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="text-lg font-semibold mt-2">${product.price}</p>
                  <p className="text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
