import { formatPrice } from "@/lib/utils";

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product?: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

interface PriceCalculatorProps {
  items: CartItem[];
  showDetails?: boolean;
  showShipping?: boolean;
  className?: string;
}

export default function PriceCalculator({ 
  items, 
  showDetails = false, 
  showShipping = true,
  className = "" 
}: PriceCalculatorProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const shippingCost = subtotal >= 5000 ? 0 : 500; // Бесплатная доставка от 5000₽
  const total = subtotal + (showShipping ? shippingCost : 0);

  return (
    <div className={`space-y-3 ${className}`}>
      {showDetails && (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {item.product?.name} × {item.quantity}
              </span>
              <span>{formatPrice((item.product?.price || 0) * item.quantity)}</span>
            </div>
          ))}
          <hr className="border-border" />
        </div>
      )}
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Товаров ({totalItems} шт.):
          </span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        {showShipping && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Доставка:</span>
            <span className={shippingCost === 0 ? "text-green-600" : ""}>
              {shippingCost === 0 ? "Бесплатно" : formatPrice(shippingCost)}
            </span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">НДС:</span>
          <span className="text-muted-foreground">Включен в цену</span>
        </div>
        
        <hr className="border-border" />
        
        <div className="flex justify-between items-center font-medium">
          <span className="text-lg">Итого к оплате:</span>
          <span className="text-xl">{formatPrice(total)}</span>
        </div>
      </div>
      
      {showShipping && subtotal < 5000 && (
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm">
          <p className="text-blue-800">
            Добавьте товаров на <strong>{formatPrice(5000 - subtotal)}</strong> для бесплатной доставки!
          </p>
        </div>
      )}
      
      {showShipping && subtotal >= 5000 && (
        <div className="bg-green-50 border border-green-200 p-3 rounded-lg text-sm">
          <p className="text-green-800 flex items-center gap-2">
            <span>✓</span>
            Поздравляем! Вы получили бесплатную доставку
          </p>
        </div>
      )}
    </div>
  );
}