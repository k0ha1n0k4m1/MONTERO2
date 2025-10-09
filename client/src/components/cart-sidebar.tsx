import { useEffect, useState } from "react"
import { X, Plus, Minus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import { useLocation } from "wouter"
import { useQuery } from "@tanstack/react-query"
import { useLanguage } from "@/hooks/useLanguage"
import type { Product } from "@shared/schema"

export default function CartSidebar() {
  const {
    items,
    isOpen,
    setOpen,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice
  } = useCart()
  const [, setLocation] = useLocation()
  const { t } = useLanguage()

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

  const totalPrice = cartItemsWithProducts.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity
  }, 0)

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-lg bg-white">
        <SheetHeader className="border-b border-border pb-6">
          <SheetTitle className="text-xl font-light text-foreground">
            {t('shoppingCartTitle')} ({items.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {cartItemsWithProducts.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground font-light mb-4">{t('yourCartEmpty')}</p>
                <Button
                  onClick={() => setOpen(false)}
                  className="bg-foreground text-background hover:bg-muted-foreground"
                >
                  {t('continueShopping')}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-6">
                  {cartItemsWithProducts.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product?.imageUrl}
                          alt={item.product?.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-light text-foreground text-sm mb-1">
                          {item.product?.name}
                        </h4>
                        <p className="text-muted-foreground text-sm font-light">
                          {formatPrice(item.product?.price || 0)}
                        </p>

                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-border rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-muted"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-light">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-muted"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-light text-foreground">
                          {formatPrice((item.product?.price || 0) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{t('items')} ({cartItemsWithProducts.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{t('shipping')}:</span>
                    <span className="text-green-600">{t('freeShipping')}</span>
                  </div>

                  <hr className="border-border" />

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-light text-foreground">{t('total')}:</span>
                    <span className="text-lg font-light text-foreground">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-foreground text-background hover:bg-muted-foreground font-light"
                  size="lg"
                  onClick={() => {
                    setOpen(false);
                    setLocation("/checkout");
                  }}
                >
                  {t('checkout')}
                </Button>

                <Button
                  variant="outline"
                  className="w-full font-light"
                  onClick={clearCart}
                >
                  {t('clearCart')}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}