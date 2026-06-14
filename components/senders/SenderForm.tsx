"use client";

import { useState } from "react";
import { Sender } from "@/app/types/sender";

const stateCityMap: Record<string, string[]> = {
  Bihar: ["Patna", "Gaya", "Muzaffarpur", "Katihar", "Purnia"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore", "Hubli"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Telangana: ["Hyderabad", "Warangal"],
  TamilNadu: ["Chennai", "Coimbatore", "Madurai"],
};

interface SenderFormData {
  companyName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  taxId: string;
  logoUrl: string;
  bankDetails: string;
}

interface Props {
  initialData?: SenderFormData;
  onSubmit: (data: SenderFormData) => Promise<void>;
}

export default function SenderForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<SenderFormData>(
    initialData || {
      companyName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      taxId: "",
      logoUrl: "",
      bankDetails: "",
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <input
          placeholder="Company Name"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          className="border rounded-lg p-3"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border rounded-lg p-3"
          required
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border rounded-lg p-3"
          required
        />

        <input
          placeholder="GST / Tax ID"
          value={form.taxId}
          onChange={(e) => setForm({ ...form, taxId: e.target.value })}
          className="border rounded-lg p-3"
          required
        />

        <select
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value, city: "" })}
          className="border rounded-lg p-3"
          required
        >
          <option value="">Select State</option>
          {Object.keys(stateCityMap).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="border rounded-lg p-3"
          required
        >
          <option value="">Select City</option>
          {form.state &&
            stateCityMap[form.state]?.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>

        <input
          placeholder="Postal Code"
          value={form.postalCode}
          onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
          className="border rounded-lg p-3"
        />

        <input
          placeholder="Logo URL"
          value={form.logoUrl}
          onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
          className="border rounded-lg p-3"
        />

        <input
          placeholder="Country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          className="border rounded-lg p-3"
          required
        />
      </div>

      <textarea
        rows={4}
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        className="w-full border rounded-lg p-3 mt-4"
        required
      />

      <textarea
        rows={4}
        placeholder="Bank Details"
        value={form.bankDetails}
        onChange={(e) => setForm({ ...form, bankDetails: e.target.value })}
        className="w-full border rounded-lg p-3 mt-4"
        required
      />

      <button
        type="submit"
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        Save Sender
      </button>
    </form>
  );
}
