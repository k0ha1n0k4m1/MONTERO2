import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { login, register, isLoading } = useSimpleAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "";
  
  console.log('RECAPTCHA_SITE_KEY:', RECAPTCHA_SITE_KEY ? 'SET' : 'NOT SET');

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
    if (!recaptchaToken) {
      toast({
        title: t("loginError"),
        description: "Please complete the reCAPTCHA verification",
        variant: "destructive",
      });
      return;
    }

    try {
      await login({ ...data, recaptchaToken });
      toast({
        title: t("loginWelcome"),
        description: t("loginSuccessMessage"),
      });
      onClose();
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
      // Принудительно обновляем страницу для синхронизации состояния
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error: any) {
      toast({
        title: t("loginError"),
        description: error.message || t("loginErrorMessage"),
        variant: "destructive",
      });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    }
  };

  const handleRegister = async (data: RegisterData) => {
    if (!recaptchaToken) {
      toast({
        title: t("registerError"),
        description: "Please complete the reCAPTCHA verification",
        variant: "destructive",
      });
      return;
    }

    try {
      await register({ ...data, recaptchaToken });
      toast({
        title: t("registerWelcome"),
        description: t("registerSuccessMessage"),
      });
      onClose();
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (error: any) {
      toast({
        title: t("registerError"),
        description: error.message || t("registerErrorMessage"),
        variant: "destructive",
      });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-light">
            {isLogin ? t("loginTitle") : t("registerTitle")}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            {isLogin ? t("loginSubtitle") : t("registerSubtitle")}
          </DialogDescription>
        </DialogHeader>

        {isLogin ? (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" type="email" {...loginForm.register("email")} className="w-full" />
              {loginForm.formState.errors.email && (
                <p className="text-sm text-red-500">{loginForm.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                type="password"
                {...loginForm.register("password")}
                className="w-full"
              />
              {loginForm.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>

            {RECAPTCHA_SITE_KEY ? (
              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={(token) => setRecaptchaToken(token)}
                  onExpired={() => setRecaptchaToken(null)}
                />
              </div>
            ) : (
              <div className="text-center text-sm text-red-500">
                reCAPTCHA configuration missing (development mode)
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
              disabled={isLoading || (RECAPTCHA_SITE_KEY && !recaptchaToken)}
            >
              {isLoading ? t("loginLoading") : t("loginButton")}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-sm text-gray-600 hover:text-black underline"
              >
                {t("noAccountRegister")}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("firstName")}</Label>
                <Input
                  id="firstName"
                  {...registerForm.register("firstName")}
                  className="w-full"
                  data-testid="input-firstName"
                  placeholder="Ваше имя"
                />
                {registerForm.formState.errors.firstName && (
                  <p className="text-sm text-red-500">
                    {registerForm.formState.errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">{t("lastName")}</Label>
                <Input
                  id="lastName"
                  {...registerForm.register("lastName")}
                  className="w-full"
                  data-testid="input-lastName"
                  placeholder="Ваша фамилия"
                />
                {registerForm.formState.errors.lastName && (
                  <p className="text-sm text-red-500">
                    {registerForm.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                {...registerForm.register("email")}
                className="w-full"
                data-testid="input-email"
                placeholder="example@email.com"
              />
              {registerForm.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {registerForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                type="password"
                {...registerForm.register("password")}
                className="w-full"
                data-testid="input-password"
              />
              <p className="text-xs text-gray-500">Пароль должен содержать минимум 6 символов</p>
              {registerForm.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {registerForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...registerForm.register("confirmPassword")}
                className="w-full"
                data-testid="input-confirmPassword"
              />
              {registerForm.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {registerForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>

            {RECAPTCHA_SITE_KEY ? (
              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={(token) => setRecaptchaToken(token)}
                  onExpired={() => setRecaptchaToken(null)}
                />
              </div>
            ) : (
              <div className="text-center text-sm text-red-500">
                reCAPTCHA configuration missing (development mode)
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
              disabled={isLoading || (RECAPTCHA_SITE_KEY && !recaptchaToken)}
              data-testid="button-register"
            >
              {isLoading ? t("registerLoading") : t("registerButton")}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-sm text-gray-600 hover:text-black underline"
              >
                {t("hasAccountLogin")}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
