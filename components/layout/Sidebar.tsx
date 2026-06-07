// components/layout/Sidebar.tsx

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">
          InvoiceBuilder
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link href="/dashboard" className="block p-3 rounded hover:bg-slate-800">
          Dashboard
        </Link>

        <Link href="/dashboard/customers" className="block p-3 rounded hover:bg-slate-800">
          Customers
        </Link>

        <Link href="/dashboard/senders" className="block p-3 rounded hover:bg-slate-800">
          Senders
        </Link>

        <Link href="/dashboard/invoices" className="block p-3 rounded hover:bg-slate-800">
          Invoices
        </Link>

        <Link href="/dashboard/reports" className="block p-3 rounded hover:bg-slate-800">
          Reports
        </Link>
      </nav>
    </aside>
  );
}