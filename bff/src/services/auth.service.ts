import axios from "axios";

const BASE = "http://auth-service:4001";

export const AuthService = {
  login: async (body: any) => {
    const res = await axios.post(`${BASE}/login`, body);
    return res.data;
  },

  register: async (body: any) => {
    const res = await axios.post(`${BASE}/register`, body);
    return res.data;
  }
};
