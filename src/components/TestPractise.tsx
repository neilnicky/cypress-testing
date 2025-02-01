"use client" 

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TestPracticeSite = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dynamicOptions, setDynamicOptions] = useState([
    "Option 1",
    "Option 2",
    "Option 3"
  ]);

  // Simulated API call for dynamic dropdown
  const handleSearch = (value : string) => {
    setSearchTerm(value);
    // Simulate API response
    const filteredOptions = [
      `Result ${value} 1`,
      `Result ${value} 2`,
      `Result ${value} 3`,
    ];
    setDynamicOptions(filteredOptions);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8" data-testid="main-title">
        Cypress Testing Practice Site
      </h1>

      {/* Registration Form Section */}
      <Card id="registration-section">
        <CardHeader>
          <CardTitle>Registration Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              data-testid="username-input"
              placeholder="Enter username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              data-testid="email-input"
              placeholder="Enter email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              data-testid="password-input"
              placeholder="Enter password"
            />
          </div>
          <Button className="w-full" data-testid="register-button">
            Register
          </Button>
        </CardContent>
      </Card>

      {/* Dropdowns Section */}
      <Card id="dropdowns-section">
        <CardHeader>
          <CardTitle>Dropdowns Testing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Static Dropdown</Label>
            <Select data-testid="static-dropdown">
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Options</SelectLabel>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Dynamic Dropdown</Label>
            <Input
              data-testid="search-input"
              placeholder="Type to search..."
              onChange={(e) => handleSearch(e.target.value)}
              value={searchTerm}
              className="mb-2"
            />
            <Select data-testid="dynamic-dropdown">
              <SelectTrigger>
                <SelectValue placeholder="Select from results" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Results</SelectLabel>
                  {dynamicOptions.map((option, index) => (
                    <SelectItem
                      key={index}
                      value={option.toLowerCase().replace(" ", "-")}
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Radio Buttons and Checkboxes Section */}
      <Card id="selection-section">
        <CardHeader>
          <CardTitle>Radio Buttons and Checkboxes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Preferred Contact Method</Label>
            <RadioGroup
              defaultValue="email"
              data-testid="contact-method-radio"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email-radio" />
                <Label htmlFor="email-radio">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="phone-radio" />
                <Label htmlFor="phone-radio">Phone</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mail" id="mail-radio" />
                <Label htmlFor="mail-radio">Mail</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>Interests (Select all that apply)</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="coding" data-testid="coding-checkbox" />
                <Label htmlFor="coding">Coding</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="design" data-testid="design-checkbox" />
                <Label htmlFor="design">Design</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="testing" data-testid="testing-checkbox" />
                <Label htmlFor="testing">Testing</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scrollable Section */}
      <Card id="scroll-section">
        <CardHeader>
          <CardTitle>Scrollable Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="h-64 overflow-y-auto p-4 border rounded"
            data-testid="scrollable-section"
          >
            {Array.from({ length: 20 }).map((_, index) => (
              <p key={index} className="mb-4" data-testid={`paragraph-${index}`}>
                This is paragraph {index + 1} for testing scroll functionality.
              </p>
            ))}
            <Button 
              className="mt-4"
              data-testid="bottom-button"
            >
              Bottom Button
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestPracticeSite;