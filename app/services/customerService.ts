import api from "@/lib/api";
import { Customer } from "@/app/types/customer";

export const customerService = {
  getAll: async (): Promise<Customer[]> => {
    const res = await api.get("/customers");
    return res.data;
  },

  getById: async (id: string): Promise<Customer> => {
    const res = await api.get(`/customers/${id}`);
    return res.data;
  },

  create: async (data: Customer) => {
    const res = await api.post("/customers", data);
    return res.data;
  },

  update: async (id: string, data: Customer) => {
    const res = await api.put(`/customers/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await api.delete(`/customers/${id}`);
    return res.data;
  },
};