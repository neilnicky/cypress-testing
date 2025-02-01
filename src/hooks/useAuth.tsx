"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mockDb } from "@/services/mockDb";

export const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const user = mockDb.getCurrentUser(); // Simulate checking if user is logged in
    if (!user) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  return { isAuthenticated };
};
