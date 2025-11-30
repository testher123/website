import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  adminKey: string | null;
  setAdminKey: (key: string | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // For a real application, you might store this in sessionStorage to persist across page reloads.
  const [adminKey, setAdminKey] = useState<string | null>(null);

  const isAuthenticated = !!adminKey;

  return (
    <AuthContext.Provider value={{ adminKey, setAdminKey, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};