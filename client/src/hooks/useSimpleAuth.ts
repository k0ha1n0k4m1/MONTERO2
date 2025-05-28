import { useState, useEffect } from "react";
import type { User, LoginData, RegisterData } from "@shared/schema";

export function useSimpleAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Проверяем сессию на сервере при загрузке
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          localStorage.setItem('montero_user', JSON.stringify(userData));
        } else {
          // Если сессия недействительна, очищаем localStorage
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
        throw new Error(error.message || "Ошибка входа");
      }

      const result = await response.json();
      const userData = result.user;
      
      // Сохраняем пользователя локально
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
        throw new Error(error.message || "Ошибка регистрации");
      }

      const result = await response.json();
      const userData = result.user;
      
      // Сохраняем пользователя локально
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
    
    // Уведомляем сервер о выходе
    fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => {}); // Игнорируем ошибки
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