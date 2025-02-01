import TestPracticeSite from "@/components/TestPractise";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-6">
      <div className="grid gap-10 px-40 lg:px-80 grid-cols-3">
        <Button>
          <Link href="/login">Login</Link>
        </Button>
        <Button>
          <Link href="/register">Register</Link>
        </Button>
        <Button>
          <Link href="/dashboard">Dashboard</Link>{" "}
        </Button>
      </div>
      <TestPracticeSite />
    </div>
  );
}
