"use client";

import Link from "next/link";
import { customerService } from "@/app/services/customerService";
import { invoiceService } from "@/app/services/invoiceService";
import { senderService } from "@/app/services/senderService";
import { Customer } from "@/app/types/customer";
import { Invoice } from "@/app/types/invoice";
import { downloadInvoicePdf } from "@/lib/downloadInvoicePdf";

interface Props {
  invoices: Invoice[];
  customers: Customer[];
  onDelete: (id: string) => void;
}

export default function InvoiceTable({ invoices, customers, onDelete }: Props) {
  const customerMap = new Map(customers.map((customer) => [customer.id, customer.name]));

  const handleDownload = async (invoice: Invoice) => {
    if (!invoice.id) {
      alert("This invoice cannot be downloaded because it has no id.");
      return;
    }

    try {
      const invoiceDetail = await invoiceService.getById(invoice.id);

      if (!invoiceDetail.customerId || !invoiceDetail.senderId) {
        alert("This invoice is missing customer or sender information.");
        return;
      }

      const [customer, sender] = await Promise.all([
        customerService.getById(invoiceDetail.customerId),
        senderService.getById(invoiceDetail.senderId),
      ]);

      await downloadInvoicePdf(invoiceDetail, customer, sender);
    } catch (error) {
      console.error("PDF download failed", error);
      alert("Unable to download invoice PDF.");
    }
  };
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
                  <button
                    onClick={() => handleDownload(inv)}
                    className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                  >
                    Download PDF
                  </button>
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
