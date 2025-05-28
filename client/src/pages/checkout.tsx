import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { useSimpleAuth } from "@/hooks/useSimpleAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/utils";
import { useLocation } from "wouter";

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  customerEmail: z.string().email("Введите корректный email"),
  shippingAddress: z.string().min(10, "Адрес должен содержать минимум 10 символов"),
});

type CheckoutData = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const { items, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useSimpleAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "",
      customerEmail: user?.email || "",
      shippingAddress: "",
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 bg-background">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Войдите в систему для оформления заказа
              </p>
              <Button 
                onClick={() => setLocation("/")}
                className="w-full mt-4"
              >
                Вернуться на главную
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-background">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Ваша корзина пуста
              </p>
              <Button 
                onClick={() => setLocation("/")}
                className="w-full mt-4"
              >
                Перейти к покупкам
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: CheckoutData) => {
    setIsLoading(true);
    try {
      const orderItems = items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      const response = await apiRequest("POST", "/api/checkout", {
        ...data,
        items: orderItems,
      });

      const result = await response.json();
      
      toast({
        title: "Заказ оформлен!",
        description: `Заказ #${result.order.id} успешно создан`,
      });

      clearCart();
      setLocation("/orders");
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось оформить заказ",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-light mb-8">Оформление заказа</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Форма заказа */}
          <Card>
            <CardHeader>
              <CardTitle className="font-light">Информация о доставке</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Полное имя</Label>
                  <Input
                    id="customerName"
                    {...form.register("customerName")}
                    placeholder="Введите ваше имя"
                  />
                  {form.formState.errors.customerName && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.customerName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="customerEmail">Email</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    {...form.register("customerEmail")}
                    placeholder="ваш@email.com"
                  />
                  {form.formState.errors.customerEmail && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.customerEmail.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="shippingAddress">Адрес доставки</Label>
                  <Textarea
                    id="shippingAddress"
                    {...form.register("shippingAddress")}
                    placeholder="Город, улица, дом, квартира"
                    rows={3}
                  />
                  {form.formState.errors.shippingAddress && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.shippingAddress.message}
                    </p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Оформление..." : "Подтвердить заказ"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Сумма заказа */}
          <Card>
            <CardHeader>
              <CardTitle className="font-light">Ваш заказ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.product?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Количество: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatPrice((item.product?.price || 0) * item.quantity)}
                    </p>
                  </div>
                ))}
                
                <hr className="border-border" />
                
                <div className="flex justify-between items-center text-lg font-medium">
                  <span>Итого:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Доставка будет рассчитана после оформления заказа
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}