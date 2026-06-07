// app/dashboard/page.tsx

export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Total Customers</h3>
          <p className="text-3xl font-bold mt-2">120</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Total Senders</h3>
          <p className="text-3xl font-bold mt-2">15</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Invoices</h3>
          <p className="text-3xl font-bold mt-2">450</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Revenue</h3>
          <p className="text-3xl font-bold mt-2">$25,000</p>
        </div>
      </div>
    </div>
  );
}