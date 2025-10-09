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

          {}
          <div className="grid gap-8 lg:grid-cols-3 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="font-medium mb-2">{t('thirtyDayGuarantee')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('thirtyDayGuaranteeDesc')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <RefreshCw className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="font-medium mb-2">{t('freeExchangeService')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('freeExchangeServiceDesc')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <CheckCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <h3 className="font-medium mb-2">{t('fullRefundPolicy')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('fullRefundPolicyDesc')}
                </p>
              </CardContent>
            </Card>
          </div>

          {}
          <div className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-light">{t('returnProcessTitle')}</CardTitle>
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

          {}
          <div className="grid gap-8 lg:grid-cols-2 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-light">{t('returnableItems')}</CardTitle>
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
                <CardTitle className="text-xl font-light">{t('returnConditions')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">{t('itemMustBe')}</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• {t('originalCondition')}</li>
                    <li>• {t('withTags')}</li>
                    <li>• {t('originalPackaging')}</li>
                    <li>• {t('noSigns')}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">{t('returnTimelines')}</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• {t('fourteenDays')}</li>
                    <li>• {t('refundTime')}</li>
                    <li>• {t('exchangeTime')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}