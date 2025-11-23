import axios from "axios";

const BASE = "http://messages-service:4003";

export const MessagesService = {
  list: async () => {
    const res = await axios.get(`${BASE}/messages`);
    return res.data;
  },

  create: async (body: any) => {
    const res = await axios.post(`${BASE}/messages`, body);
    return res.data;
  }
};
