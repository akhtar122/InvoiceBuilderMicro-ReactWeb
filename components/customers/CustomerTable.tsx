
"use client";
import Link from "next/link";
import { Customer } from "@/app/types/customer";

// export interface Customer {
//   id: number;
//   customerCode: string;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   isActive: boolean;
// }

interface Props {
  customers: Customer[];
  onDelete: (id: string) => void;
}

export default function CustomerTable({
  customers,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              {/* <th className="text-left p-4">Code</th> */}
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Phone</th>
              {/* <th className="text-left p-4">Status</th> */}
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-t hover:bg-slate-50"
              >
                {/* <td className="p-4">{customer.customerCode}</td> */}
                <td className="p-4">{customer.name}</td>
                <td className="p-4">{customer.email}</td>
                <td className="p-4">{customer.phone}</td>

                {/* <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      customer.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.isActive ? "Active" : "Inactive"}
                  </span>
                </td> */}

                <td className="p-4 text-center space-x-2">
                  <Link
                    href={`/dashboard/customers/${customer.id}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => customer.id && onDelete(customer.id)}
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