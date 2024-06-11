// components/UserProfile.tsx
import useAuthStore from "@/stores/auth.store";
import React, { useEffect } from "react";

const UserProfile: React.FC = () => {
  const { user, isAuthenticated, loading, fetchUser } = useAuthStore(
    (state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      loading: state.loading,
      fetchUser: state.fetchUser,
    })
  );

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <p>Loading...</p>; // Replace with your loader component
  }

  if (!isAuthenticated) {
    return <p>Please log in.</p>;
  }

  return (
    <div>
      <h1>Welcome, {user?.firstName}</h1>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default UserProfile;
