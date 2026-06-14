// services/senderService.ts

import api from "@/lib/api";
import { Sender } from "@/app/types/sender";

export const senderService = {
  getAll: async (): Promise<Sender[]> => {
    const res = await api.get("/senders");
    return res.data;
  },

  getById: async (id: string): Promise<Sender> => {
    const res = await api.get(`/senders/${id}`);
    return res.data;
  },

  create: async (data: Sender) => {
    try {
      const res = await api.post("/senders", data);
      return res.data;
    } catch (err: any) {
      if (err?.response?.status === 401) {
        throw new Error("Unauthorized: please login again.");
      }
      throw err;
    }
  },

  update: async (id: string, data: Sender) => {
    const res = await api.put(`/senders/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await api.delete(`/senders/${id}`);
    return res.data;
  },
};