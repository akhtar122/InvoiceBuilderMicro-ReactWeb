"use client";

import Link from "next/link";
import { Customer } from "@/app/types/customer";
import { Invoice } from "@/app/types/invoice";

interface Props {
  invoices: Invoice[];
  customers: Customer[];
  onDelete: (id: string) => void;
}

export default function InvoiceTable({ invoices, customers, onDelete }: Props) {
  const customerMap = new Map(customers.map((customer) => [customer.id, customer.name]));
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Number</th>
              <th className="text-left p-4">Invoice Date</th>
              <th className="text-left p-4">Due Date</th>
              <th className="text-left p-4">Customer</th>
              <th className="text-left p-4">Total</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t hover:bg-slate-50">
                <td className="p-4">{inv.invoiceNumber || "-"}</td>
                <td className="p-4">{new Date(inv.invoiceDate).toLocaleDateString()}</td>
                <td className="p-4">{new Date(inv.dueDate).toLocaleDateString()}</td>
                <td className="p-4">{customerMap.get(inv.customerId) || inv.customerId || "-"}</td>
                <td className="p-4">{inv.grandTotal ?? "-"}</td>
                <td className="p-4 text-center space-x-2">
                  <Link href={`/dashboard/invoices/${inv.id}`} className="px-3 py-1 bg-blue-500 text-white rounded">Edit</Link>
                  <button onClick={() => inv.id && onDelete(inv.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
