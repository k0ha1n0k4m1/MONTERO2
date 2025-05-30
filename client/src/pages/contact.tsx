import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CartSidebar from "@/components/cart-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const contactSchema = z.object({
    name: z.string().min(1, t('nameRequired')),
    email: z.string().email(t('emailInvalid')),
    subject: z.string().min(1, t('subjectRequired')),
    message: z.string().min(10, t('messageMinLength')),
  });

  type ContactData = z.infer<typeof contactSchema>;

  const form = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const handleSubmit = async (data: ContactData) => {
    setIsSubmitting(true);

    // Симуляция отправки сообщения
    setTimeout(() => {
      toast({
        title: t('messageSent'),
        description: t('messageSentDesc'),
      });
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CartSidebar />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              {t('contactTitle')}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('contactSubtitle')}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-light">
                  {t('sendMessage')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('name')}</Label>
                    <Input id="name" {...form.register("name")} />
                    {form.formState.errors.name && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{t('subject')}</Label>
                    <Input id="subject" {...form.register("subject")} />
                    {form.formState.errors.subject && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('message')}</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      {...form.register("message")}
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('sendingMessage') : t('sendMessageBtn')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-light">
                    {t('contactInfo')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-gray-600 mt-1" />
                    <div>
                      <h3 className="font-medium">{t('email')}</h3>
                      <p className="text-gray-600">Montero.team.kr@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-gray-600 mt-1" />
                    <div>
                      <h3 className="font-medium">{t('phone')}</h3>
                      <p className="text-gray-600">+7 (495) 123-45-67</p>
                      <p className="text-gray-600">+7 (800) 555-67-89</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-gray-600 mt-1" />
                    <div>
                      <h3 className="font-medium">{t('address')}</h3>
                      <p className="text-gray-600">
                        г. Москва, ул. Тверская, д. 15, стр. 1<br />
                        Метро: Тверская, Пушкинская
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-gray-600 mt-1" />
                    <div>
                      <h3 className="font-medium">{t('businessHours')}</h3>
                      <p className="text-gray-600">
                        {t('mondayToFriday')}
                        <br />
                        {t('saturday')}
                        <br />
                        {t('sunday')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
