// components/customers/CustomerCard.tsx

// import { Customer } from "../../types/index";

export interface Customer {
  id: string;
  customerCode: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  isActive: boolean;
}

interface Props {
  customer: Customer;
}

export default function CustomerCard({
  customer,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-bold text-lg">
        {customer.name}
      </h3>

      <p>{customer.email}</p>
      <p>{customer.phone}</p>

      <div className="mt-3">
        <span
          className={`px-2 py-1 rounded text-sm ${
            customer.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {customer.isActive ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
}