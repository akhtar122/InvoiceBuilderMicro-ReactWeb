"use client";

import { useEffect, useState } from "react";
import { customerService } from "@/app/services/customerService";
import { senderService } from "@/app/services/senderService";
import { Customer } from "@/app/types/customer";
import { Invoice, InvoiceItem } from "@/app/types/invoice";
import { Sender } from "@/app/types/sender";

interface Props {
  initialData?: Invoice;
  onSubmit: (data: Partial<Invoice>) => Promise<void>;
}

export default function InvoiceForm({ initialData, onSubmit }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [senders, setSenders] = useState<Sender[]>([]);
  const [form, setForm] = useState<Invoice>(
    (initialData as Invoice) || {
      invoiceDate: new Date().toISOString(),
      dueDate: new Date().toISOString(),
      customerId: "",
      senderId: "",
      items: [
        { description: "", quantity: 1, unitPrice: 0, taxRate: 0 },
      ],
      notes: "",
    }
  );

  const handleItemChange = (index: number, key: keyof InvoiceItem, value: any) => {
    const items = [...form.items];
    // @ts-ignore
    items[index][key] = value;
    setForm({ ...form, items });
  };

  const addItem = () => setForm({ ...form, items: [...form.items, { description: "", quantity: 1, unitPrice: 0, taxRate: 0 }] });

  const removeItem = (index: number) => {
    const items = [...form.items];
    items.splice(index, 1);
    setForm({ ...form, items });
  };

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [customerData, senderData] = await Promise.all([
          customerService.getAll(),
          senderService.getAll(),
        ]);

        setCustomers(customerData);
        setSenders(senderData);
      } catch (error) {
        console.error("Failed to load invoice references", error);
      }
    };

    loadOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6">
      <div className="grid md:grid-cols-2 gap-4 items-start">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">Invoice Date</span>
          <input type="date" value={form.invoiceDate.slice(0,10)} onChange={(e) => setForm({ ...form, invoiceDate: new Date(e.target.value).toISOString() })} className="border rounded-lg p-3" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">Due Date</span>
          <input type="date" value={form.dueDate.slice(0,10)} onChange={(e) => setForm({ ...form, dueDate: new Date(e.target.value).toISOString() })} className="border rounded-lg p-3" />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">Customer</span>
          <select value={form.customerId || ""} onChange={(e) => setForm({ ...form, customerId: e.target.value })} className="border rounded-lg p-3 bg-white">
            <option value="">Select customer</option>
            {customers.map((customer) => (
              <option key={customer.id || customer.name} value={customer.id || ""}>
                {customer.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700">Sender</span>
          <select value={form.senderId || ""} onChange={(e) => setForm({ ...form, senderId: e.target.value })} className="border rounded-lg p-3 bg-white">
            <option value="">Select sender</option>
            {senders.map((sender) => (
              <option key={sender.id || sender.companyName} value={sender.id || ""}>
                {sender.companyName}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4">
        <h3 className="font-bold mb-2">Items</h3>
        {form.items.map((item, idx) => (
          <div key={idx} className="grid grid-cols-6 gap-2 items-center mb-2">
            <input className="col-span-2 border rounded-lg p-2" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(idx, 'description', e.target.value)} />
            <input className="border rounded-lg p-2" type="number" value={item.quantity} onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))} />
            <input className="border rounded-lg p-2" type="number" value={item.unitPrice} onChange={(e) => handleItemChange(idx, 'unitPrice', Number(e.target.value))} />
            <input className="border rounded-lg p-2" type="number" value={item.taxRate} onChange={(e) => handleItemChange(idx, 'taxRate', Number(e.target.value))} />
            <button type="button" onClick={() => removeItem(idx)} className="col-span-1 bg-red-500 text-white px-2 py-1 rounded">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addItem} className="mt-2 bg-gray-200 px-3 py-1 rounded">Add Item</button>
      </div>

      <textarea rows={3} placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full border rounded-lg p-3 mt-4" />

      <button type="submit" className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">Save Invoice</button>
    </form>
  );
}
