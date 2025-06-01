import { useState } from "react"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage, type Language } from "@/hooks/useLanguage"
import { cn } from "@/lib/utils"

const languages = [
  { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' }
]

interface LanguageSelectorProps {
  isWhitePage?: boolean
}

export default function LanguageSelector({ isWhitePage = false }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find(lang => lang.code === language)

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  const iconClasses = isWhitePage 
    ? "text-black hover:text-gray-700" 
    : "text-white hover:text-white/80"

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={iconClasses}>
          <Globe className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md bg-white">
        <SheetHeader>
          <SheetTitle className="text-xl font-light text-foreground">
            {t('language')}
          </SheetTitle>
        </SheetHeader>
        
        <div className="py-6">
          <div className="space-y-3">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-left font-light h-auto py-4 px-4",
                  language === lang.code 
                    ? "bg-muted text-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                onClick={() => handleLanguageChange(lang.code)}
              >
                <span className="text-2xl mr-3">{lang.flag}</span>
                <span className="text-base">{lang.name}</span>
                {language === lang.code && (
                  <span className="ml-auto text-sm">✓</span>
                )}
              </Button>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Current: <span className="font-medium">{currentLanguage?.flag} {currentLanguage?.name}</span>
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}