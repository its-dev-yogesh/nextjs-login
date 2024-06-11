"use client";
// components/LoginComponent.tsx
import useAuthStore from "@/stores/auth.store";
import React, { useState } from "react";

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuthStore((state) => ({
    login: state.login,
    loading: state.loading,
  }));

  const handleLogin = () => {
    const userData = { firstName: "John Doe", email: "john@example.com" };
    login(userData);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p> // Replace with your loader component
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
};

export default LoginComponent;
