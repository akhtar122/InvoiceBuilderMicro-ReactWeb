"use client";

import { Invoice } from "@/app/types/invoice";
import { Customer } from "@/app/types/customer";
import { Sender } from "@/app/types/sender";

interface Props {
  invoice: Invoice;
  customer: Customer;
  sender: Sender;
}

const formatCurrency = (value: number) => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default function InvoicePreview({ invoice, customer, sender }: Props) {
  const items = invoice.items.map((item) => {
    const amount = item.amount ?? item.quantity * item.unitPrice;
    const taxAmount = item.taxAmount ?? (amount * item.taxRate) / 100;
    const total = item.total ?? amount + taxAmount;
    return {
      ...item,
      amount,
      taxAmount,
      total,
    };
  });

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h1 className="text-2xl font-bold mb-4">INVOICE</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border p-4 rounded-lg">
          <h2 className="font-semibold text-lg mb-2">Customer</h2>
          <p className="font-bold">{customer.name}</p>
          <p>{customer.address}</p>
          <p>{customer.city}, {customer.state} {customer.postalCode}</p>
          <p>{customer.country}</p>
        </div>

        <div className="border p-4 rounded-lg">
          <h2 className="font-semibold text-lg mb-2">Sender</h2>
          <p className="font-bold">{sender.companyName}</p>
          <p>{sender.address}</p>
          <p>{sender.city}, {sender.state} {sender.postalCode}</p>
          <p>{sender.country}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-sm text-slate-500">Invoice Number</p>
          <p className="font-semibold">{invoice.invoiceNumber || "-"}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Invoice Date</p>
          <p className="font-semibold">{new Date(invoice.invoiceDate).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-3 text-left">Description</th>
              <th className="border p-3 text-right">Qty</th>
              <th className="border p-3 text-right">Unit Price</th>
              <th className="border p-3 text-right">Tax Rate</th>
              <th className="border p-3 text-right">Amount</th>
              <th className="border p-3 text-right">Tax Amount</th>
              <th className="border p-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id || item.description}>
                <td className="border p-3">{item.description}</td>
                <td className="border p-3 text-right">{item.quantity}</td>
                <td className="border p-3 text-right">{formatCurrency(item.unitPrice)}</td>
                <td className="border p-3 text-right">{item.taxRate}%</td>
                <td className="border p-3 text-right">{formatCurrency(item.amount)}</td>
                <td className="border p-3 text-right">{formatCurrency(item.taxAmount)}</td>
                <td className="border p-3 text-right">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="border p-3 font-semibold text-right" colSpan={6}>Grand Total</td>
              <td className="border p-3 text-right font-semibold">{formatCurrency(grandTotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
