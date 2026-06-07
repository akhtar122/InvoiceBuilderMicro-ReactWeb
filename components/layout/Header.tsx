// components/layout/Header.tsx

"use client";

import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <h2 className="font-semibold text-lg">
        Dashboard
      </h2>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </header>
  );
}