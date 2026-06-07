"use client";

import { useRouter } from "next/navigation";
import SenderForm from "@/components/senders/SenderForm";
import { senderService } from "@/app/services/senderService";

export default function CreateSenderPage() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    try {
      await senderService.create(data);
      alert("Sender created successfully");
      router.push("/dashboard/senders");
    } catch (error) {
      console.error(error);
      alert("Failed to create sender");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Sender</h1>
      <SenderForm onSubmit={handleCreate} />
    </div>
  );
}
