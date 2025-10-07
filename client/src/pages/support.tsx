import Header from "@/components/header";
import Footer from "@/components/footer";
import CartSidebar from "@/components/cart-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Mail, Phone, MessageCircle, Clock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function Support() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CartSidebar />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              {t('supportTitle')}
            </h1>
            <p className="text-gray-600">
              {t('supportSubtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-light">
                  <MessageCircle className="h-5 w-5" />
                  {t('contactMethods')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">montero.team.kr@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">{t('phone')}</p>
                    <p className="text-sm text-gray-600">+821084092796</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <MessageCircle className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">{t('onlineChat')}</p>
                    <p className="text-sm text-gray-600">{t('availableOnSite')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-light">
                  <Clock className="h-5 w-5" />
                  {t('businessHours')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>{t('mondayToFriday')}</span>
                  <span className="font-medium">9:00 - 21:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('saturday')}</span>
                  <span className="font-medium">10:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('sunday')}</span>
                  <span className="font-medium">12:00 - 17:00</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/">{t('backToShopping')}</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
