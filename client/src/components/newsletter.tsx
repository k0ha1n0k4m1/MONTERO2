import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/useLanguage"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate newsletter subscription
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: t('subscribed'),
      description: t('stayUpdated'),
    })
    
    setEmail("")
    setIsLoading(false)
  }

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="bg-black/20 backdrop-blur rounded-[2rem] p-12 text-center shadow-lg">
          <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t('newsletter')}</h3>
          <p className="text-white/80 font-medium text-lg mb-8 max-w-2xl mx-auto">
            {t('stayUpdated')}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder={t('enterEmail')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-gray-500"
              required
            />
            <Button 
              type="submit"
              disabled={isLoading}
              className="bg-gray-900 text-white hover:bg-gray-700 font-light"
            >
              {isLoading ? t('subscribing') : t('subscribe')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
