// services/senderService.ts

import api from "@/lib/api";

export const senderService = {
  getAll: () => api.get("/senders"),

  getById: (id: number) =>
    api.get(`/sender/${id}`),

  create: (data: any) =>
    api.post("/sender", data),

  update: (id: number, data: any) =>
    api.put(`/sender/${id}`, data),

  delete: (id: number) =>
    api.delete(`/sender/${id}`),
};