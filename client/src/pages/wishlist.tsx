import Header from "@/components/header";
import Footer from "@/components/footer";
import CartSidebar from "@/components/cart-sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart } from "lucide-react";

export default function Wishlist() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <CartSidebar />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-light text-gray-900 mb-4">
                Необходимо войти в систему
              </h1>
              <p className="text-gray-600 mb-8">
                Для просмотра избранных товаров необходимо войти в свой аккаунт
              </p>
              <Button asChild>
                <Link href="/">На главную</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CartSidebar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              Избранное
            </h1>
            <p className="text-gray-600">
              Сохраняйте понравившиеся товары для быстрого доступа
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <h2 className="text-xl font-light text-gray-900 mb-4">
                Ваш список избранного пуст
              </h2>
              <p className="text-gray-600 mb-8">
                Добавляйте товары в избранное, нажимая на иконку сердца на карточках товаров
              </p>
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <Link href="/">Начать покупки</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}