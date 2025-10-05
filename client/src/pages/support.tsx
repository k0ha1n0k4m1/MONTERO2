import Header from "@/components/header";
import Footer from "@/components/footer";
import CartSidebar from "@/components/cart-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Mail, Phone, MessageCircle, Clock, MapPin } from "lucide-react";

export default function Support() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CartSidebar />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              Помощь и поддержка
            </h1>
            <p className="text-gray-600">
              Мы всегда готовы помочь вам с любыми вопросами
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-light">
                  <MessageCircle className="h-5 w-5" />
                  Способы связи
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">support@montero.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Телефон</p>
                    <p className="text-sm text-gray-600">+821084092796</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <MessageCircle className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Онлайн-чат</p>
                    <p className="text-sm text-gray-600">Доступен на сайте</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-light">
                  <Clock className="h-5 w-5" />
                  Часы работы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Понедельник - Пятница</span>
                  <span className="font-medium">9:00 - 21:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Суббота</span>
                  <span className="font-medium">10:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Воскресенье</span>
                  <span className="font-medium">12:00 - 17:00</span>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl font-light">
                  Часто задаваемые вопросы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Как отследить мой заказ?</h3>
                  <p className="text-gray-600 text-sm">
                    После отправки заказа вы получите трек-номер на email. 
                    Также можете отследить заказ в разделе "История заказов" в личном кабинете.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Какие способы оплаты доступны?</h3>
                  <p className="text-gray-600 text-sm">
                    Мы принимаем банковские карты, оплату через СБП, Apple Pay, Google Pay, 
                    а также наличными при получении.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Можно ли вернуть товар?</h3>
                  <p className="text-gray-600 text-sm">
                    Да, вы можете вернуть товар в течение 14 дней с момента получения, 
                    если он не был в употреблении и сохранена оригинальная упаковка.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Сколько стоит доставка?</h3>
                  <p className="text-gray-600 text-sm">
                    Доставка по Москве - бесплатно при заказе от 3000₽. 
                    По России - от 300₽, бесплатно при заказе от 5000₽.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/">Вернуться к покупкам</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}