import Header from "@/components/header";
import Footer from "@/components/footer";
import CartSidebar from "@/components/cart-sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/use-wishlist";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";
import type { Product } from "@shared/schema";

export default function Wishlist() {
  const { user, isAuthenticated } = useAuth();
  const { items: wishlistItems, removeItem } = useWishlist();
  const { t } = useLanguage();
  
  // Get products data for all products
  const { data: products = [] } = useQuery({
    queryKey: ["/api/products"],
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <CartSidebar />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-light text-gray-900 mb-4">
                {t('mustLogin')}
              </h1>
              <p className="text-gray-600 mb-8">
                {t('mustLoginWishlist')}
              </p>
              <Button asChild>
                <Link href="/">{t('toHome')}</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Match wishlist items with product data
  const wishlistProducts = wishlistItems.map((item: any) => {
    const product = (products as Product[]).find((p: Product) => p.id === item.productId);
    return product ? { ...item, product } : null;
  }).filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CartSidebar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              {t('wishlistTitle')}
            </h1>
            <p className="text-gray-600">
              {t('wishlistSubtitle')}
            </p>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-12 text-center">
              <div className="max-w-md mx-auto">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                <h2 className="text-xl font-light text-gray-900 mb-4">
                  {t('wishlistEmpty')}
                </h2>
                <p className="text-gray-600 mb-8">
                  {t('wishlistEmptyDesc')}
                </p>
                <Button asChild className="bg-black text-white hover:bg-gray-800">
                  <Link href="/">{t('startShopping')}</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistProducts.map((item: any) => (
                <div key={item.id} className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-square">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-light text-gray-900 mb-2">
                      {item.product.name}
                    </h3>
                    <p className="text-lg font-light text-gray-900 mb-3">
                      {formatPrice(item.product.price)}
                    </p>
                    <Button asChild className="w-full bg-black text-white hover:bg-gray-800">
                      <Link href={`/product/${item.product.id}`}>
                        {t('viewProduct')}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
