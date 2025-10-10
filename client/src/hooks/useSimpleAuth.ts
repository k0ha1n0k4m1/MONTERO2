import { useState, useEffect } from "react";
import type { User, LoginData, RegisterData } from "@shared/schema";

export function useSimpleAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.user !== null) {
            setUser(data.user || data);
            localStorage.setItem('montero_user', JSON.stringify(data.user || data));
          } else {
            localStorage.removeItem('montero_user');
            setUser(null);
          }
        } else {
          localStorage.removeItem('montero_user');
          setUser(null);
        }
      } catch (e) {
        localStorage.removeItem('montero_user');
        setUser(null);
      }
    };

    checkSession();
  }, []);

  const login = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();

        if (error.details && Array.isArray(error.details)) {
          const validationErrors = error.details.map((detail: any) => detail.msg).join('. ');
          throw new Error(validationErrors);
        }

        throw new Error(error.message || "Ошибка входа");
      }

      const result = await response.json();
      const userData = result.user;

      localStorage.setItem('montero_user', JSON.stringify(userData));
      setUser(userData);

      return userData;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();

        if (error.details && Array.isArray(error.details)) {
          const validationErrors = error.details.map((detail: any) => detail.msg).join('. ');
          throw new Error(validationErrors);
        }

        throw new Error(error.message || "Ошибка регистрации");
      }

      const result = await response.json();
      const userData = result.user;

      localStorage.setItem('montero_user', JSON.stringify(userData));
      setUser(userData);

      return userData;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('montero_user');
    setUser(null);

    fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => {});
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
}