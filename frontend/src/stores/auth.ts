import { defineStore } from "pinia";
import axios from "axios";

interface User {
  id: number;
  email: string;
  isConnected: boolean | null;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post("http://127.0.0.1:3333/login", {
          email,
          password,
        });
        this.token = response.data.token;
        this.user = response.data.user;
        if (this.user) {
          this.user.isConnected = true;
          if (this.token) {
            localStorage.setItem("token", this.token);
          }
        }
      } catch (error) {
        console.error("Login failed", error);
      }
    },
    async register(email: string, password: string) {
      try {
        await axios.post("http://127.0.0.1:3333/register", {
          email,
          password,
        });
      } catch (error) {
        console.error("Registration failed", error);
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },

    isAuthenticated() {
      return !!this.user;
    },
  },
});
