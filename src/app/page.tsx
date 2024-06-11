"use client";
// pages/index.tsx
import useAuthStore from "@/stores/auth.store";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";

// Dynamically import components that use Zustand store to avoid SSR issues
const UserProfile = dynamic(() => import("../components/UserProfile"), {
  ssr: false,
});
const LoginComponent = dynamic(() => import("../components/LoginComponent"), {
  ssr: false,
});
const LogoutComponent = dynamic(() => import("../components/LogoutComponent"), {
  ssr: false,
});

const HomePage: React.FC = () => {
  const { isAuthenticated, initialize, loading } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    initialize: state.initialize,
    loading: state.loading,
  }));

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      initialize(accessToken);
    }
  }, [initialize]);

  return (
    <div>
      <h1>Home Page</h1>
      {loading ? (
        <p>Loading...</p> // Replace with your loader component
      ) : (
        <>
          <UserProfile />
          {!isAuthenticated ? <LoginComponent /> : <LogoutComponent />}
        </>
      )}
    </div>
  );
};

export default HomePage;
