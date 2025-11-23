import axios from "axios";

const BASE = "http://users-service:4002";

export const UsersService = {
  getById: async (id: string) => {
    const res = await axios.get(`${BASE}/users/${id}`);
    return res.data;
  },

  getAll: async () => {
    const res = await axios.get(`${BASE}/users`);
    return res.data;
  }
};
