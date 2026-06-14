import api from "@/lib/api";
import { Customer } from "@/app/types/customer";

export const customerService = {
  getAll: async (): Promise<Customer[]> => {
    const res = await api.get("/customers");
    return res.data;
  },

  getById: async (id: string): Promise<Customer> => {
    try {
      const res = await api.get(`/customers/${id}`);
      return res.data;
    } catch (err: any) {
      if (err?.response?.status === 404) {
        const res = await api.get(`/customer/${id}`);
        return res.data;
      }
      throw err;
    }
  },

  create: async (data: Customer) => {
    const res = await api.post("/customers", data);
    return res.data;
  },

  update: async (id: string, data: Customer) => {
    try {
      const res = await api.put(`/customers/${id}`, data);
      return res.data;
    } catch (err: any) {
      if (err?.response?.status === 404) {
        const res = await api.put(`/customer/${id}`, data);
        return res.data;
      }
      throw err;
    }
  },

  delete: async (id: string) => {
    try {
      const res = await api.delete(`/customers/${id}`);
      return res.data;
    } catch (err: any) {
      if (err?.response?.status === 404) {
        const res = await api.delete(`/customer/${id}`);
        return res.data;
      }
      throw err;
    }
  },
};