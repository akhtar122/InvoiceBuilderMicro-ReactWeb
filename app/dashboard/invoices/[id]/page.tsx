"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import InvoiceForm from "@/components/invoices/InvoiceForm";
import InvoicePreview from "@/components/invoices/InvoicePreview";
import { invoiceService } from "@/app/services/invoiceService";
import { customerService } from "@/app/services/customerService";
import { senderService } from "@/app/services/senderService";
import { Invoice } from "@/app/types/invoice";
import { Customer } from "@/app/types/customer";
import { Sender } from "@/app/types/sender";

export default function EditInvoicePage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === 'string' ? params.id : '';

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [sender, setSender] = useState<Sender | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const data = await invoiceService.getById(id);
        setInvoice(data);

        if (data.customerId) {
          const customerData = await customerService.getById(data.customerId);
          setCustomer(customerData);
        }

        if (data.senderId) {
          const senderData = await senderService.getById(data.senderId);
          setSender(senderData);
        }
      } catch (e) {
        console.error(e);
        alert('Unable to load invoice details');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleUpdate = async (data: Partial<Invoice>) => {
    try {
      await invoiceService.update(id, data);
      alert('Updated');
      router.push('/dashboard/invoices');
    } catch (e) {
      console.error(e);
      alert('Update failed');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete invoice?')) return;
    try {
      await invoiceService.delete(id);
      alert('Deleted');
      router.push('/dashboard/invoices');
    } catch (e) {
      console.error(e);
      alert('Delete failed');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!invoice) return <div>Invoice not found</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Invoice</h1>
        <div className="flex gap-3">
          <button onClick={() => router.push('/dashboard/invoices')} className="px-4 py-2 border rounded-lg">Cancel</button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg">Delete</button>
        </div>
      </div>

      {customer && sender ? (
        <InvoicePreview invoice={invoice} customer={customer} sender={sender} />
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">Customer or sender data is unavailable.</div>
      )}

      <InvoiceForm initialData={invoice} onSubmit={handleUpdate} />
    </div>
  );
}
