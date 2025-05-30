import Header from "@/components/header";
import Footer from "@/components/footer";
import CartSidebar from "@/components/cart-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/hooks/useLanguage";

export default function SizeGuide() {
  const { t } = useLanguage();

  const sizeCharts = {
    tops: {
      title: t('topsAndOuterwear'),
      headers: [t('sizeColumn'), t('chestCircumference'), t('waistCircumference'), t('lengthColumn')],
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
      title: t('bottomsAndSkirts'),
      headers: [t('sizeColumn'), t('waistCircumference'), t('hipCircumference'), t('inseamLength')],
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
      title: t('outerwearJackets'),
      headers: [t('sizeColumn'), t('chestCircumference'), t('sleeveLength'), t('itemLength')],
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
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CartSidebar />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              {t('sizeGuideTitle')}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('sizeGuideSubtitle')}
            </p>
          </div>

          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-light">{t('howToMeasure')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium mb-2">{t('chestMeasurement')}</h3>
                    <p className="text-gray-600 text-sm">
                      {t('chestMeasurementDesc')}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">{t('waistMeasurement')}</h3>
                    <p className="text-gray-600 text-sm">
                      {t('waistMeasurementDesc')}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">{t('sleeveMeasurement')}</h3>
                    <p className="text-gray-600 text-sm">
                      {t('sleeveMeasurementDesc')}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">{t('hipMeasurement')}</h3>
                    <p className="text-gray-600 text-sm">
                      {t('hipMeasurementDesc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="tops" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tops">{t('top')}</TabsTrigger>
              <TabsTrigger value="bottoms">{t('bottom')}</TabsTrigger>
              <TabsTrigger value="outerwear">{t('outerwear')}</TabsTrigger>
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
                <CardTitle className="text-xl font-light">{t('fitRecommendations')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium mb-2">{t('classicFit')}</h3>
                    <p className="text-gray-600 text-sm">
                      {t('classicFitDesc')}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">{t('oversizedModels')}</h3>
                    <p className="text-gray-600 text-sm">
                      {t('oversizedModelsDesc')}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mt-6">
                  <p className="text-sm text-gray-700">
                    <strong>{t('sizeHelp')}</strong> {t('sizeHelpDesc')}
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