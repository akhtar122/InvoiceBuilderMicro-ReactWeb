// app/dashboard/customers/create/page.tsx

"use client";

import { useRouter } from "next/navigation";
import CustomerForm from "@/components/customers/CustomerForm";
import { customerService } from "../../../services/customerService";

export default function CreateCustomerPage() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    try {
      await customerService.create(data);

      alert("Customer created successfully");

      router.push("/dashboard/customers");
    } catch (error) {
      console.error(error);
      alert("Failed to create customer");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Create Customer
      </h1>

      <CustomerForm onSubmit={handleCreate} />
    </div>
  );
}