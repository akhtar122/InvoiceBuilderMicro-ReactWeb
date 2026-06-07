// services/invoiceService.ts

import api from "@/lib/api";

export const invoiceService = {
  getAll: () => api.get("/invoices"),

  getById: (id: number) =>
    api.get(`/invoice/${id}`),

  create: (data: any) =>
    api.post("/invoice", data),

  update: (id: number, data: any) =>
    api.put(`/invoice/${id}`, data),

  delete: (id: number) =>
    api.delete(`/invoice/${id}`),
};