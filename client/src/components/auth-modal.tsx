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
import { useLanguage } from "@/hooks/useLanguage";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, isLoading } = useSimpleAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

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
        title: t('loginWelcome'),
        description: t('loginSuccessMessage'),
      });
      onClose();
      // Принудительно обновляем страницу для синхронизации состояния
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error: any) {
      toast({
        title: t('loginError'),
        description: error.message || t('loginErrorMessage'),
        variant: "destructive",
      });
    }
  };

  const handleRegister = async (data: RegisterData) => {
    try {
      await register(data);
      toast({
        title: t('registerWelcome'),
        description: t('registerSuccessMessage'),
      });
      onClose();
    } catch (error: any) {
      toast({
        title: t('registerError'),
        description: error.message || t('registerErrorMessage'),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black/5 backdrop-blur-md" aria-describedby="auth-description">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-light">
            {isLogin ? t('loginTitle') : t('registerTitle')}
          </DialogTitle>
          <DialogDescription id="auth-description" className="text-center text-sm text-muted-foreground">
            {isLogin ? t('loginSubtitle') : t('registerSubtitle')}
          </DialogDescription>
        </DialogHeader>

        {isLogin ? (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
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
              <Label htmlFor="password">{t('password')}</Label>
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
              {isLoading ? t('loginLoading') : t('loginButton')}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-sm text-gray-600 hover:text-black underline"
              >
                {t('noAccountRegister')}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t('firstName')}</Label>
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
                <Label htmlFor="lastName">{t('lastName')}</Label>
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
              <Label htmlFor="email">{t('email')}</Label>
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
              <Label htmlFor="password">{t('password')}</Label>
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
              <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
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
              disabled={isLoading}
            >
              {isLoading ? t('registerLoading') : t('registerButton')}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-sm text-gray-600 hover:text-black underline"
              >
                {t('hasAccountLogin')}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}