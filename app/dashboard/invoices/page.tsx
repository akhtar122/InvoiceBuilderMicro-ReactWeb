"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import InvoiceTable from "@/components/invoices/InvoiceTable";
import { invoiceService } from "@/app/services/invoiceService";
import { customerService } from "@/app/services/customerService";
import { Invoice } from "@/app/types/invoice";
import { Customer } from "@/app/types/customer";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = async () => {
    try {
      const [invoiceData, customerData] = await Promise.all([
        invoiceService.getAll(),
        customerService.getAll(),
      ]);
      setInvoices(invoiceData);
      setCustomers(customerData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const deleteInvoice = async (id: string) => {
    if (!confirm("Delete invoice?")) return;
    await invoiceService.delete(id);
    load();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <Link href="/dashboard/invoices/create" className="bg-blue-600 text-white px-5 py-2 rounded-lg">+ Add Invoice</Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <input type="text" placeholder="Search..." className="w-full border rounded-lg p-3" value={search} onChange={(e)=>setSearch(e.target.value)} />
      </div>

      <InvoiceTable invoices={invoices} customers={customers} onDelete={deleteInvoice} />
    </div>
  );
}
