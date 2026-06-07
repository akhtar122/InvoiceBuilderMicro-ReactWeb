"use client";

import Link from "next/link";
import { Sender } from "@/app/types/sender";

interface Props {
  senders: Sender[];
  onDelete: (id: string) => void;
}

export default function SenderTable({ senders, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">Company</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Phone</th>
              <th className="text-left p-4">State</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {senders.map((sender) => (
              <tr key={sender.id} className="border-t hover:bg-slate-50">
                <td className="p-4">{sender.companyName}</td>
                <td className="p-4">{sender.email}</td>
                <td className="p-4">{sender.phone}</td>
                <td className="p-4">{sender.state}</td>
                <td className="p-4 text-center space-x-2">
                  <Link
                    href={`/dashboard/senders/${sender.id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => sender.id && onDelete(sender.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
