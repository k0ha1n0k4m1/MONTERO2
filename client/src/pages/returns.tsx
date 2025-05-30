import Header from "@/components/header";
import Footer from "@/components/footer";
import CartSidebar from "@/components/cart-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, XCircle, Clock, Package, RefreshCw } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function Returns() {
  const { t } = useLanguage();

  const returnSteps = [
    {
      step: 1,
      title: t('returnStep1'),
      description: t('returnStep1Desc'),
      icon: Package,
    },
    {
      step: 2,
      title: t('returnStep2'),
      description: t('returnStep2Desc'),
      icon: Package,
    },
    {
      step: 3,
      title: t('returnStep3'),
      description: t('returnStep3Desc'),
      icon: RefreshCw,
    },
    {
      step: 4,
      title: t('returnStep4'),
      description: t('returnStep4Desc'),
      icon: CheckCircle,
    },
  ];

  const returnableItems = [
    { item: t('clothingUndamaged'), allowed: true },
    { item: t('itemsWithTags'), allowed: true },
    { item: t('shoesInBox'), allowed: true },
    { item: t('accessoryItems'), allowed: true },
    { item: t('underwear'), allowed: false },
    { item: t('swimwear'), allowed: false },
    { item: t('usedItems'), allowed: false },
    { item: t('itemsWithoutTags'), allowed: false },
  ];
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CartSidebar />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              {t('returnsTitle')}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('returnsSubtitle')}
            </p>
          </div>

          {/* Return Policy Overview */}
          <div className="grid gap-8 lg:grid-cols-3 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="font-medium mb-2">14 дней</h3>
                <p className="text-gray-600 text-sm">
                  На возврат и обмен товара с момента получения
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <RefreshCw className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="font-medium mb-2">Бесплатный обмен</h3>
                <p className="text-gray-600 text-sm">
                  Обмен товара на другой размер или цвет
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <CheckCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="font-medium mb-2">Полный возврат</h3>
                <p className="text-gray-600 text-sm">
                  100% возврат средств при соблюдении условий
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Return Process */}
          <div className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-light">Процесс возврата</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {returnSteps.map((step) => {
                    const IconComponent = step.icon;
                    return (
                      <div key={step.step} className="text-center">
                        <div className="relative mb-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                            <IconComponent className="h-8 w-8 text-gray-600" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-medium">
                            {step.step}
                          </div>
                        </div>
                        <h3 className="font-medium mb-2">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* What Can Be Returned */}
          <div className="grid gap-8 lg:grid-cols-2 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-light">Что можно вернуть</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {returnableItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {item.allowed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className={item.allowed ? "text-gray-900" : "text-gray-500"}>
                        {item.item}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-light">Условия возврата</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Товар должен быть:</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• В первоначальном состоянии</li>
                    <li>• С прикрепленными ярлыками</li>
                    <li>• В оригинальной упаковке</li>
                    <li>• Без следов использования</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Сроки возврата:</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• 14 дней с момента получения</li>
                    <li>• Возврат средств: 7-14 рабочих дней</li>
                    <li>• Обмен: 3-5 рабочих дней</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-light">Часто задаваемые вопросы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Можно ли вернуть товар без упаковки?</h3>
                <p className="text-gray-600 text-sm">
                  Да, но товар должен быть в идеальном состоянии с прикрепленными ярлыками. 
                  Мы рекомендуем сохранять упаковку до принятия окончательного решения о покупке.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Сколько стоит возврат?</h3>
                <p className="text-gray-600 text-sm">
                  Возврат товара осуществляется за счет покупателя, кроме случаев брака или ошибки в заказе. 
                  Обмен на другой размер - бесплатно при заказе от 3000₽.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Как получить возврат средств?</h3>
                <p className="text-gray-600 text-sm">
                  Средства возвращаются тем же способом, которым была произведена оплата. 
                  Для банковских карт срок возврата составляет 7-14 рабочих дней.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-xl font-light mb-4">Нужна помощь с возвратом?</h2>
              <p className="text-gray-600 mb-6">
                Наша служба поддержки готова помочь вам с оформлением возврата или ответить на любые вопросы.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild className="bg-black text-white hover:bg-gray-800">
                  <Link href="/contact">Связаться с поддержкой</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/orders">Мои заказы</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}