// components/LogoutComponent.tsx
import useAuthStore from "@/stores/auth.store";
import React from "react";

const LogoutComponent: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);

  return <button onClick={logout}>Logout</button>;
};

export default LogoutComponent;
