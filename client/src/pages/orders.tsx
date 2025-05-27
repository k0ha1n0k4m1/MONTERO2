import Header from "@/components/header";
import Footer from "@/components/footer";
import CartSidebar from "@/components/cart-sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Orders() {
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
                Для просмотра истории заказов необходимо войти в свой аккаунт
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
              История заказов
            </h1>
            <p className="text-gray-600">
              Просматривайте свои предыдущие покупки и статус доставки
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-light text-gray-900 mb-4">
                У вас пока нет заказов
              </h2>
              <p className="text-gray-600 mb-8">
                Начните покупки в нашем каталоге, чтобы увидеть историю заказов здесь
              </p>
              <Button asChild className="bg-black text-white hover:bg-gray-800">
                <Link href="/">Перейти к покупкам</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}