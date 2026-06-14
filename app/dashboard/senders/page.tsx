"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import SenderTable from "@/components/senders/SenderTable";
import { senderService } from "@/app/services/senderService";
import { Sender } from "@/app/types/sender";

export default function SendersPage() {
  const [senders, setSenders] = useState<Sender[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadSenders = async () => {
    try {
      const data = await senderService.getAll();
      setSenders(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSenders();
  }, []);

  const deleteSender = async (id: string) => {
    if (!confirm("Delete sender?")) return;

    await senderService.delete(id);
    loadSenders();
  };

  const filtered = senders.filter(
    (sender) =>
      sender.companyName.toLowerCase().includes(search.toLowerCase()) ||
      sender.email.toLowerCase().includes(search.toLowerCase()) ||
      sender.phone.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-3xl font-bold">Senders</h1>

        <Link
          href="/dashboard/senders/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Sender
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <input
          type="text"
          placeholder="Search sender..."
          className="w-full border rounded-lg p-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <SenderTable senders={filtered} onDelete={deleteSender} />
    </div>
  );
}
