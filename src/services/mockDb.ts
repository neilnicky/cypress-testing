// import { faker } from '@faker-js/faker';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  image: string;
}

// class MockDatabase {
//   private users: Map<string, User>;
  
//   constructor() {
//     this.users = new Map();
//   }

//   // User methods
//   createUser(userData: Omit<User, 'id' | 'createdAt'>): User {
//     const newUser: User = {
//       ...userData,
//       id: faker.string.uuid(),
//       createdAt: new Date()
//     };
//     this.users.set(userData.email, newUser);
//     return newUser;
//   }

//   getUserByEmail(email: string): User | undefined {
//     return this.users.get(email);
//   }

//   // Product methods
//   generateProducts(count: number = 50): Product[] {
//     return Array.from({ length: count }, () => ({
//       id: faker.string.uuid(),
//       name: faker.commerce.productName(),
//       price: faker.commerce.price(),
//       description: faker.commerce.productDescription(),
//       category: faker.commerce.department(),
//       image: `/api/placeholder/300/200`,
//     }));
//   }
// }

// Create a singleton instance
const users = [
  { id: "1", email: "user@example.com", password: "password123" }
];

let currentUser: { id: string; email: string } | null = null;

export const mockDb = {
  getUserByEmail: (email: string) => users.find((user) => user.email === email),
  createUser: (userData: { email: string; password: string; username: string }) => {
    users.push({ id: `${users.length + 1}`, ...userData });
  },
  loginUser: (email: string, password: string) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) currentUser = { id: user.id, email: user.email };
    return user;
  },
  logoutUser: () => {
    currentUser = null;
  },
  getCurrentUser: () => currentUser
};


