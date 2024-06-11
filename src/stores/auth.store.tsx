// stores/useAuthStore.ts
import { persistNSync } from "persist-and-sync";
import create from "zustand";
import { persist } from "zustand/middleware";

interface User {
  firstName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  fetchUser: () => Promise<void>;
  login: (userData: User) => void;
  logout: () => void;
  initialize: (accessToken: string) => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persistNSync(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      initialize: async (accessToken: string) => {
        set({ loading: true });
        try {
          const response = await fetch("https://dummyjson.com/auth/me", {
            method: "GET",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pa2l0dmlzaHdha2FybWFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJwYXNzd29yZDEyMyIsImlhdCI6MTcxNjI1NDM3NSwiZXhwIjoxNzE2MzQwNzc1fQ.q244PFg1PlSWdJHWmJKrje3bAbX7EEWvL1MlpzkB-Ys",
            },
          });
          if (!response.ok) {
            set({ loading: false });
            throw new Error("Failed to fetch user");
          }
          const userData = await response.json();
          set({ user: userData, isAuthenticated: true, loading: false });
        } catch (error) {
          console.error("Initialization error:", error);
          set({ loading: false });
        }
      },
      fetchUser: async () => {
        set({ loading: true });
        try {
          const response = await fetch("/api/user"); // Replace with your API endpoint
          const userData = await response.json();
          set({ user: userData, isAuthenticated: true, loading: false });
        } catch (error) {
          console.error("Failed to fetch user:", error);
          set({ loading: false });
        }
      },
      login: () => {
        set({ loading: true });
        fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "emilys",
            password: "emilyspass",
            expiresInMins: 30, // optional, defaults to 60
          }),
        })
          .then(async (res) => {
            const responseData = await res.json();
            console.log(responseData);
            set({ user: responseData, isAuthenticated: true });
            set({ loading: false });
          })
          .then(console.log);
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage", // unique name for item in local storage
    }
  )
);

export default useAuthStore;
