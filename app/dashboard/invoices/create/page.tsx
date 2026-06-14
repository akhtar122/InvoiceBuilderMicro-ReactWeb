"use client";

import { useRouter } from "next/navigation";
import InvoiceForm from "@/components/invoices/InvoiceForm";
import { invoiceService } from "@/app/services/invoiceService";

export default function CreateInvoicePage() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    try {
      await invoiceService.create(data);
      alert("Invoice created");
      router.push("/dashboard/invoices");
    } catch (err) {
      console.error(err);
      alert("Failed to create invoice");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Invoice</h1>
      <InvoiceForm onSubmit={handleCreate} />
    </div>
  );
}
