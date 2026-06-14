// services/invoiceService.ts

import api from "@/lib/api";
import { Invoice } from "@/app/types/invoice";

export const invoiceService = {
  getAll: async (): Promise<Invoice[]> => {
    const res = await api.get("/invoices");
    return res.data;
  },

  getById: async (id: string): Promise<Invoice> => {
    const res = await api.get(`/invoices/${id}`);
    return res.data;
  },

  create: async (data: Partial<Invoice>) => {
    const res = await api.post("/invoices", data);
    return res.data;
  },

  update: async (id: string, data: Partial<Invoice>) => {
    const res = await api.put(`/invoices/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await api.delete(`/invoices/${id}`);
    return res.data;
  },
};