import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CartSidebar from "@/components/cart-sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { User, Mail, Calendar } from "lucide-react";
import { z } from "zod";

export default function Profile() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);

  const profileSchema = z.object({
    firstName: z.string().min(1, t("firstNameRequired")),
    lastName: z.string().min(1, t("lastNameRequired")),
    email: z.string().email(t("emailInvalidProfile")),
  });

  type ProfileData = z.infer<typeof profileSchema>;

  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <CartSidebar />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-2xl font-light text-gray-900 mb-4">
                {t("mustLoginProfile")}
              </h1>
              <p className="text-gray-600 mb-8">
                {t("mustLoginProfileDesc")}
              </p>
              <Button asChild>
                <Link href="/">{t("toHome")}</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSave = (data: ProfileData) => {
    // TODO: Implement profile update API
    console.log("Saving profile data:", data);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CartSidebar />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              {t("accountSettings")}
            </h1>
            <p className="text-gray-600">
              {t("manageInfo")}
            </p>
          </div>

          <div className="grid gap-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-light">
                  <User className="h-5 w-5" />
                  {t("personalInfo")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{t("firstName")}</Label>
                        <Input
                          id="firstName"
                          {...form.register("firstName")}
                        />
                        {form.formState.errors.firstName && (
                          <p className="text-sm text-red-500">
                            {form.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">{t("lastName")}</Label>
                        <Input
                          id="lastName"
                          {...form.register("lastName")}
                        />
                        {form.formState.errors.lastName && (
                          <p className="text-sm text-red-500">
                            {form.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
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

                    <div className="flex gap-2">
                      <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                        {t("save")}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                      >
                        {t("cancel")}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-gray-500">{t("firstName")}</Label>
                        <p className="font-medium">{user.firstName || t("notSpecified")}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">{t("lastName")}</Label>
                        <p className="font-medium">{user.lastName || t("notSpecified")}</p>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm text-gray-500">Email</Label>
                      <p className="font-medium">{user.email}</p>
                    </div>

                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(true)}
                    >
                      {t("edit")}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-light">
                  <Calendar className="h-5 w-5" />
                  {t("accountInfo")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-gray-500">{t("registrationDate")}</Label>
                    <p className="font-medium">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('ru-RU') : t("notSpecified")}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm text-gray-500">{t("userId")}</Label>
                    <p className="font-medium text-gray-600">#{user.id}</p>
                  </div>
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