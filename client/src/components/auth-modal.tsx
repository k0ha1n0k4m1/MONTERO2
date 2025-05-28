import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSimpleAuth } from "@/hooks/useSimpleAuth";
import { loginSchema, registerSchema, type LoginData, type RegisterData } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, isLoading } = useSimpleAuth();
  const { toast } = useToast();

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  const handleLogin = async (data: LoginData) => {
    try {
      await login(data);
      toast({
        title: "Добро пожаловать!",
        description: "Вы успешно вошли в систему",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Ошибка входа",
        description: error.message || "Проверьте ваши учетные данные",
        variant: "destructive",
      });
    }
  };

  const handleRegister = async (data: RegisterData) => {
    try {
      await register(data);
      toast({
        title: "Добро пожаловать в MONTERO!",
        description: "Ваш аккаунт успешно создан",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Ошибка регистрации",
        description: error.message || "Попробуйте еще раз",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" aria-describedby="auth-description">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-light">
            {isLogin ? "Вход" : "Регистрация"}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            {isLogin ? "Войдите в свой аккаунт" : "Создайте новый аккаунт в MONTERO"}
          </DialogDescription>
        </DialogHeader>

        {isLogin ? (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...loginForm.register("email")}
                className="w-full"
              />
              {loginForm.formState.errors.email && (
                <p className="text-sm text-red-500">{loginForm.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                {...loginForm.register("password")}
                className="w-full"
              />
              {loginForm.formState.errors.password && (
                <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-black text-white hover:bg-gray-800"
              disabled={isLoading}
            >
              {isLoading ? "Вход..." : "Войти"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-sm text-gray-600 hover:text-black underline"
              >
                Нет аккаунта? Зарегистрироваться
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Имя</Label>
                <Input
                  id="firstName"
                  {...registerForm.register("firstName")}
                  className="w-full"
                />
                {registerForm.formState.errors.firstName && (
                  <p className="text-sm text-red-500">{registerForm.formState.errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Фамилия</Label>
                <Input
                  id="lastName"
                  {...registerForm.register("lastName")}
                  className="w-full"
                />
                {registerForm.formState.errors.lastName && (
                  <p className="text-sm text-red-500">{registerForm.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...registerForm.register("email")}
                className="w-full"
              />
              {registerForm.formState.errors.email && (
                <p className="text-sm text-red-500">{registerForm.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                {...registerForm.register("password")}
                className="w-full"
              />
              {registerForm.formState.errors.password && (
                <p className="text-sm text-red-500">{registerForm.formState.errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердить пароль</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...registerForm.register("confirmPassword")}
                className="w-full"
              />
              {registerForm.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">{registerForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-black text-white hover:bg-gray-800"
              disabled={isRegisterPending}
            >
              {isRegisterPending ? "Регистрация..." : "Зарегистрироваться"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-sm text-gray-600 hover:text-black underline"
              >
                Уже есть аккаунт? Войти
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}