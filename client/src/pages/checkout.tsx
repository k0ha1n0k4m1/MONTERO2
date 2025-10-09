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
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/useLanguage";
import type { Product } from "@shared/schema";

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const { items, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useSimpleAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  const checkoutSchema = z.object({
    customerName: z.string().min(2, t("nameRequired")),
    customerEmail: z.string().email(t("invalidEmail")),
    shippingAddress: z.string().min(10, t("addressRequired")),
  });

  type CheckoutData = z.infer<typeof checkoutSchema>;

  const { data: products } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const res = await fetch('/api/products')
      if (!res.ok) throw new Error('Failed to fetch products')
      return res.json()
    }
  })

  const cartItemsWithProducts = items.map(item => {
    const product = products?.find(p => p.id === item.productId)
    return {
      ...item,
      product
    }
  }).filter(item => item.product)

  const totalPrice = cartItemsWithProducts.reduce((sum, item) =>
    sum + (item.product?.price || 0) * item.quantity, 0
  );

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
                {t("loginToOrder")}
              </p>
              <Button
                onClick={() => setLocation("/")}
                className="w-full mt-4"
              >
                {t("toHome")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (cartItemsWithProducts.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-background">
        <div className="max-w-2xl mx-auto px-6 py-12">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                {t("cartEmptyCheckout")}
              </p>
              <Button
                onClick={() => setLocation("/")}
                className="w-full mt-4"
              >
                {t("goToShopping")}
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
      const orderItems = cartItemsWithProducts.map(item => ({
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
        <h1 className="text-3xl font-light mb-8">{t("checkoutTitle")}</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {}
          <Card>
            <CardHeader>
              <CardTitle className="font-light">{t("shippingInfo")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="customerName">{t("fullName")}</Label>
                  <Input
                    id="customerName"
                    {...form.register("customerName")}
                    placeholder={t("fullNamePlaceholder")}
                  />
                  {form.formState.errors.customerName && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.customerName.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="customerEmail">이메일</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    {...form.register("customerEmail")}
                    placeholder={t("emailPlaceholder")}
                  />
                  {form.formState.errors.customerEmail && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.customerEmail.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="shippingAddress">{t("shippingAddress")}</Label>
                  <Textarea
                    id="shippingAddress"
                    {...form.register("shippingAddress")}
                    placeholder={t("addressPlaceholder")}
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
                  {isLoading ? t("processing") : t("placeOrder")}
                </Button>
              </form>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardHeader>
              <CardTitle className="font-light">{t("orderSummary")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItemsWithProducts.map((item) => (
                  <div key={item.id} className="border-b border-border pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-medium">{item.product?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.product?.price || 0)} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        {formatPrice((item.product?.price || 0) * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-sm">
                    <span>{t("subtotal")} ({cartItemsWithProducts.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>{t("shipping")}:</span>
                    <span className="text-green-600">{t("freeShipping")}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>{t("tax")}:</span>
                    <span>{t("taxIncluded")}</span>
                  </div>

                  <hr className="border-border" />

                  <div className="flex justify-between items-center text-lg font-medium">
                    <span>{t("totalAmount")}:</span>
                    <span className="text-xl">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <div className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground">
                  <p>✓ 50,000원 이상 주문 시 무료배송</p>
                  <p>✓ 30일 이내 교환/반품 가능</p>
                  <p>✓ 품질보증</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}