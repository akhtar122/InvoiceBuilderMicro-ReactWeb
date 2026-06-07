"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import CustomerForm from "@/components/customers/CustomerForm";
import { customerService } from "@/app/services/customerService";
import { Customer } from "@/app/types/customer";

export default function EditCustomerPage() {
  const params = useParams();
  const router = useRouter();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  const id = typeof params?.id === "string" ? params.id : "";

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const loadCustomer = async () => {
      try {
        const data = await customerService.getById(id);
        setCustomer(data);
      } catch (error) {
        console.error(error);
        alert("Unable to load customer");
      } finally {
        setLoading(false);
      }
    };

    loadCustomer();
  }, [id]);

  const handleUpdate = async (data: Customer) => {
    try {
      await customerService.update(id, data);

      alert("Customer updated successfully");

      router.push("/dashboard/customers");
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      await customerService.delete(id);

      alert("Customer deleted");

      router.push("/dashboard/customers");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  if (loading) {
    return <div>Loading customer...</div>;
  }

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Edit Customer
        </h1>

        <div className="flex gap-3">

          <button
            onClick={() => router.push("/dashboard/customers")}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete
          </button>

        </div>

      </div>

      <CustomerForm
        initialData={customer}
        onSubmit={handleUpdate}
      />
    </div>
  );
}