// app/dashboard/customers/page.tsx


"use client";

import { useEffect, useState } from "react";
import CustomerTable from "@/components/customers/CustomerTable";
import { customerService } from "@/app/services/customerService";
import { Customer } from "@/app/types/customer";
import Link from "next/link";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadCustomers = async () => {
    try {
      const data = await customerService.getAll();
      setCustomers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const deleteCustomer = async (id: string) => {
    if (!confirm("Delete customer?")) return;

    await customerService.delete(id);

    loadCustomers();
  };

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <Link
          href="/dashboard/customers/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Customer
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <input
          type="text"
          placeholder="Search customer..."
          className="w-full border rounded-lg p-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <CustomerTable
        customers={filtered.map(c => ({
          ...c,
          id: c.id ?? "",
          // some customer objects may include customerCode at runtime
          // cast to any to avoid TS error when the property isn't declared on Customer
          customerCode: (c as any).customerCode || "",
          isActive: (c as any).isActive !== undefined ? (c as any).isActive : true
        }))}
        onDelete={deleteCustomer}
      />
    </div>
  );
}