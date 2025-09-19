import { useState } from "react"
import { Link, useLocation } from "wouter"
import { Search, User, ShoppingBag, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/useAuth"
import { useLanguage } from "@/hooks/useLanguage"
import { cn } from "@/lib/utils"
import AuthModal from "./auth-modal"
import LanguageSelector from "./language-selector"
import { useToast } from "@/hooks/use-toast"
import logoImage from "@assets/logo2.png"
import MonteroLogo from "./montero-logo"

const navigation = [
  { name: 'all', href: '/' },
  { name: 'outerwear', href: '/category/outerwear' },
  { name: 'top', href: '/category/top' },
  { name: 'bottom', href: '/category/bottom' },
  { name: 'best', href: '/category/best' },
  { name: 'accessories', href: '/category/accessories' },
]

export default function Header() {
  const [location] = useLocation()
  const { getTotalItems, toggleCart } = useCart()
  const { user, isAuthenticated, logout, isLogoutPending } = useAuth()
  const { t } = useLanguage()
  
  // Determine if we're on a page with white background
  const isWhitePage = location === '/orders' || location === '/wishlist' || location === '/profile' || location === '/support' || location === '/contact' || location === '/size-guide' || location === '/returns' || location.startsWith('/product/')
  
  // Dynamic classes based on page background
  const headerClasses = isWhitePage 
    ? "text-black border-gray-200" 
    : "text-white border-white/20"
  
  const logoClasses = isWhitePage ? "text-black" : "text-white"
  const iconClasses = isWhitePage ? "text-black hover:text-gray-700" : "text-white hover:text-white/80"

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ block: 'start' })
    }
  }

  const handleNavClick = (e: React.MouseEvent, item: any) => {
    e.preventDefault()
    
    // Если мы не на главной странице и нажали "all", вернуться на главную и прокрутить к продуктам
    if (item.name === 'all') {
      if (window.location.pathname !== '/') {
        window.location.href = '/'
      } else {
        scrollToSection('products')
      }
    } else {
      // Для категорий перейти на страницу категории
      window.location.href = item.href
    }
  }
  const { toast } = useToast()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  
  // Extract category from URL path
  const currentCategory = location.startsWith('/category/') 
    ? location.split('/category/')[1] 
    : 'all'
  const totalItems = getTotalItems()

  const handleLogout = async () => {
    try {
      await logout()
      setUserMenuOpen(false)
      toast({
        title: "До свидания!",
        description: "Вы успешно вышли из системы",
      })
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось выйти из системы",
        variant: "destructive",
      })
    }
  }

  return (
    <header className={cn("bg-transparent fixed w-full top-0 z-50", headerClasses)}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <img 
                src={logoImage} 
                alt="MONTERO" 
                className="h-12 md:h-16 w-auto"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-12">
            {navigation.map((item) => (
              <div key={item.name} onClick={(e) => handleNavClick(e, item)}>
                <div className={cn(
                  "text-base font-bold transition-colors duration-300 relative group cursor-pointer",
                  isWhitePage ? "text-black" : "text-white",
                  currentCategory === item.name 
                    ? (isWhitePage ? "text-black" : "text-white")
                    : (isWhitePage ? "text-gray-600 hover:text-black" : "text-white/80 hover:text-white")
                )}>
                  {t(item.name)}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300",
                    currentCategory === item.name ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </div>
              </div>
            ))}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <LanguageSelector isWhitePage={isWhitePage} />
            
            <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={iconClasses}>
                  <Search className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-auto bg-white">
                <div className="max-w-2xl mx-auto py-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder={t('search') + '...'} 
                      className="pl-10 h-12 text-lg border-border focus:border-foreground"
                      autoFocus
                    />
                  </div>
                  <p className="text-center text-muted-foreground mt-4 text-sm">
                    {t('search')}
                  </p>
                </div>
              </SheetContent>
            </Sheet>
            
            <Sheet open={userMenuOpen} onOpenChange={setUserMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={iconClasses}>
                  <User className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md bg-white">
                <div className="py-6">
                  <h3 className="text-xl font-light text-foreground mb-6">{t('account')}</h3>
                  <div className="space-y-4">
                    {isAuthenticated ? (
                      <>
                        <div className="text-sm text-muted-foreground mb-4">
                          {t('userWelcome')}, {user?.firstName || user?.email}!
                        </div>
                        <hr className="border-border" />
                        <div className="space-y-3">
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-muted-foreground font-light"
                            asChild
                          >
                            <Link href="/orders" onClick={() => setUserMenuOpen(false)}>
                              {t('orderHistory')}
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-muted-foreground font-light"
                            asChild
                          >
                            <Link href="/wishlist" onClick={() => setUserMenuOpen(false)}>
                              {t('favorites')}
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-muted-foreground font-light"
                            asChild
                          >
                            <Link href="/profile" onClick={() => setUserMenuOpen(false)}>
                              {t('accountSettings')}
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-muted-foreground font-light"
                            asChild
                          >
                            <Link href="/support" onClick={() => setUserMenuOpen(false)}>
                              {t('helpSupport')}
                            </Link>
                          </Button>
                          <hr className="border-border" />
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-red-600 font-light hover:text-red-700"
                            onClick={handleLogout}
                            disabled={isLogoutPending}
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            {isLogoutPending ? t('loginLoading') : t('logout')}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start font-light"
                          onClick={() => {
                            setAuthModalOpen(true)
                            setUserMenuOpen(false)
                          }}
                        >
                          {t('login')}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start font-light"
                          onClick={() => {
                            setAuthModalOpen(true)
                            setUserMenuOpen(false)
                          }}
                        >
                          {t('register')}
                        </Button>
                        <hr className="border-border" />
                        <div className="space-y-3">
                          <Button variant="ghost" className="w-full justify-start text-muted-foreground font-light">
                            {t('orderHistory')}
                          </Button>
                          <Button variant="ghost" className="w-full justify-start text-muted-foreground font-light">
                            {t('favorites')}
                          </Button>
                          <Button variant="ghost" className="w-full justify-start text-muted-foreground font-light">
                            {t('helpSupport')}
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(iconClasses, "relative")}
              onClick={toggleCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className={cn(
                  "absolute -top-2 -right-2 text-xs rounded-full h-5 w-5 flex items-center justify-center",
                  isWhitePage ? "bg-black text-white" : "bg-white text-black"
                )}>
                  {totalItems}
                </span>
              )}
            </Button>
            
            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn("md:hidden", iconClasses)}>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-black/90 backdrop-blur-md text-white">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/20">
                    <h2 className="text-lg md:text-xl font-light text-white">MONTERO</h2>
                  </div>
                  <nav className="flex-1 px-4 md:px-6 py-6 md:py-8">
                    <ul className="space-y-4 md:space-y-6">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <div 
                            className={cn(
                              "text-base md:text-lg font-light transition-colors duration-300 cursor-pointer py-2 px-3 rounded-lg",
                              currentCategory === item.name 
                                ? "text-white bg-white/10" 
                                : "text-white/80 hover:text-white hover:bg-white/5"
                            )}
                            onClick={(e) => {
                              handleNavClick(e, item)
                              setMobileMenuOpen(false)
                            }}
                          >
                            {t(item.name)}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </header>
  )
}
