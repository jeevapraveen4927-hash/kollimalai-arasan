"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";

export interface AuthUser {
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoggedIn: boolean;
  hydrated: boolean;
  register: (user: AuthUser) => void;
  login: (email: string) => { success: boolean; message?: string };
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USER_KEY = "kollimalai-user";
const SESSION_KEY = "kollimalai-session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const rawUser = window.localStorage.getItem(USER_KEY);
      const session = window.localStorage.getItem(SESSION_KEY);
      if (rawUser) setUser(JSON.parse(rawUser));
      if (session === "true") setIsLoggedIn(true);
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  const register = useCallback((newUser: AuthUser) => {
    const cleanUser: AuthUser = {
      fullName: newUser.fullName.trim(),
      email: newUser.email.trim(),
      phone: newUser.phone?.trim(),
    };
    window.localStorage.setItem(USER_KEY, JSON.stringify(cleanUser));
    window.localStorage.setItem(SESSION_KEY, "true");
    setUser(cleanUser);
    setIsLoggedIn(true);
  }, []);

  const login = useCallback((email: string) => {
    try {
      const rawUser = window.localStorage.getItem(USER_KEY);
      if (!rawUser) {
        return {
          success: false,
          message: "No account found for this email. Please register first.",
        };
      }
      const savedUser: AuthUser = JSON.parse(rawUser);
      if (savedUser.email.trim().toLowerCase() !== email.trim().toLowerCase()) {
        return {
          success: false,
          message: "No account found for this email. Please register first.",
        };
      }
      window.localStorage.setItem(SESSION_KEY, "true");
      setUser(savedUser);
      setIsLoggedIn(true);
      return { success: true };
    } catch {
      return { success: false, message: "Something went wrong. Try again." };
    }
  }, []);

  const logout = useCallback(() => {
    window.localStorage.setItem(SESSION_KEY, "false");
    setIsLoggedIn(false);
  }, []);

  const updateUser = useCallback((updates: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...updates };
      window.localStorage.setItem(USER_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, hydrated, register, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
