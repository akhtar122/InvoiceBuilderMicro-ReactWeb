"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import SenderForm from "@/components/senders/SenderForm";
import { senderService } from "@/app/services/senderService";
import { Sender } from "@/app/types/sender";

export default function EditSenderPage() {
  const params = useParams();
  const router = useRouter();

  const [sender, setSender] = useState<Sender | null>(null);
  const [loading, setLoading] = useState(true);

  const id = typeof params?.id === "string" ? params.id : "";

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const loadSender = async () => {
      try {
        const data = await senderService.getById(id);
        setSender(data);
      } catch (error) {
        console.error(error);
        alert("Unable to load sender");
      } finally {
        setLoading(false);
      }
    };

    loadSender();
  }, [id]);

  const handleUpdate = async (data: Sender) => {
    try {
      await senderService.update(id, data);
      alert("Sender updated successfully");
      router.push("/dashboard/senders");
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this sender?");
    if (!confirmDelete) return;

    try {
      await senderService.delete(id);
      alert("Sender deleted");
      router.push("/dashboard/senders");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  if (loading) {
    return <div>Loading sender...</div>;
  }

  if (!sender) {
    return <div>Sender not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Sender</h1>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/dashboard/senders")}
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
      <SenderForm initialData={sender} onSubmit={handleUpdate} />
    </div>
  );
}
