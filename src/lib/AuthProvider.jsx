"use client";

import { createContext, useContext } from "react";
import { useSession } from "./auth-client";

const AuthContext = createContext({ user: null, loading: true });

export function AuthProvider({ children }) {
  const { data: session, isPending } = useSession();

  const value = {
    user: session?.user || null,
    loading: isPending,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
