import Header from "@/components/header";
import Footer from "@/components/footer";
import CartSidebar from "@/components/cart-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sizeCharts = {
  tops: {
    title: "Верхняя одежда и топы",
    headers: ["Размер", "Обхват груди (см)", "Обхват талии (см)", "Длина (см)"],
    data: [
      ["XS", "80-84", "60-64", "60"],
      ["S", "84-88", "64-68", "62"],
      ["M", "88-92", "68-72", "64"],
      ["L", "92-96", "72-76", "66"],
      ["XL", "96-100", "76-80", "68"],
      ["XXL", "100-104", "80-84", "70"],
    ]
  },
  bottoms: {
    title: "Брюки и юбки",
    headers: ["Размер", "Обхват талии (см)", "Обхват бедер (см)", "Длина по внутр. шву (см)"],
    data: [
      ["XS", "60-64", "86-90", "75"],
      ["S", "64-68", "90-94", "76"],
      ["M", "68-72", "94-98", "77"],
      ["L", "72-76", "98-102", "78"],
      ["XL", "76-80", "102-106", "79"],
      ["XXL", "80-84", "106-110", "80"],
    ]
  },
  outerwear: {
    title: "Верхняя одежда",
    headers: ["Размер", "Обхват груди (см)", "Длина рукава (см)", "Длина изделия (см)"],
    data: [
      ["XS", "84-88", "58", "65"],
      ["S", "88-92", "59", "67"],
      ["M", "92-96", "60", "69"],
      ["L", "96-100", "61", "71"],
      ["XL", "100-104", "62", "73"],
      ["XXL", "104-108", "63", "75"],
    ]
  }
};

export default function SizeGuide() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CartSidebar />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              Таблица размеров
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Используйте наши подробные таблицы размеров, чтобы найти идеальную посадку для каждого изделия MONTERO.
            </p>
          </div>

          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-light">Как правильно снять мерки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium mb-2">Обхват груди</h3>
                    <p className="text-gray-600 text-sm">
                      Измерьте обхват груди по самой выступающей части, держа сантиметровую ленту параллельно полу.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Обхват талии</h3>
                    <p className="text-gray-600 text-sm">
                      Измерьте обхват в самой узкой части талии, обычно чуть выше пупка.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Обхват бедер</h3>
                    <p className="text-gray-600 text-sm">
                      Измерьте обхват по самой широкой части бедер, примерно на 20 см ниже талии.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Длина рукава</h3>
                    <p className="text-gray-600 text-sm">
                      Измерьте от плечевой точки до запястья при слегка согнутой руке.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="tops" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tops">Топы</TabsTrigger>
              <TabsTrigger value="bottoms">Низ</TabsTrigger>
              <TabsTrigger value="outerwear">Верхняя одежда</TabsTrigger>
            </TabsList>

            {Object.entries(sizeCharts).map(([key, chart]) => (
              <TabsContent key={key} value={key}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-light">{chart.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            {chart.headers.map((header, index) => (
                              <th key={index} className="text-left py-3 px-4 font-medium">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {chart.data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b border-gray-100">
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="py-3 px-4 text-gray-600">
                                  {cellIndex === 0 ? (
                                    <span className="font-medium text-gray-900">{cell}</span>
                                  ) : (
                                    cell
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-light">Рекомендации по посадке</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium mb-2">Классическая посадка</h3>
                    <p className="text-gray-600 text-sm">
                      Большинство наших изделий имеют классическую посадку. Если вы находитесь между размерами, 
                      рекомендуем выбрать больший размер для более комфортной посадки.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Oversized модели</h3>
                    <p className="text-gray-600 text-sm">
                      Для изделий с пометкой "Oversized" рекомендуем выбирать ваш обычный размер или 
                      даже на размер меньше для достижения желаемого эффекта.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mt-6">
                  <p className="text-sm text-gray-700">
                    <strong>Не можете определиться с размером?</strong> Свяжитесь с нашей службой поддержки, 
                    и мы поможем вам выбрать идеальную посадку. Также у нас действует удобная политика обмена и возврата.
                  </p>
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