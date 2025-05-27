import { useState } from "react"
import { Link, useLocation } from "wouter"
import { Search, User, ShoppingBag, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import AuthModal from "./auth-modal"
import { useToast } from "@/hooks/use-toast"

const navigation = [
  { name: 'all', href: '/' },
  { name: 'outerwear', href: '/category/outerwear' },
  { name: 'top', href: '/category/top' },
  { name: 'bottom', href: '/category/bottom' },
  { name: 'accessories', href: '/category/accessories' },
]

export default function Header() {
  const [location] = useLocation()
  const { getTotalItems, toggleCart } = useCart()
  const { user, isAuthenticated, logout, isLogoutPending } = useAuth()
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
    <header className="border-b border-border bg-white/95 backdrop-blur-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-light tracking-wider text-foreground hover:text-muted-foreground transition-colors duration-300">
                MONTERO
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-12">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <div className={cn(
                  "text-sm font-light transition-colors duration-300 relative group cursor-pointer",
                  currentCategory === item.name 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}>
                  {item.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300",
                    currentCategory === item.name ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </div>
              </Link>
            ))}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-6">
            <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Search className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-auto bg-white">
                <div className="max-w-2xl mx-auto py-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search products..." 
                      className="pl-10 h-12 text-lg border-border focus:border-foreground"
                      autoFocus
                    />
                  </div>
                  <p className="text-center text-muted-foreground mt-4 text-sm">
                    Start typing to search our collection
                  </p>
                </div>
              </SheetContent>
            </Sheet>
            
            <Sheet open={userMenuOpen} onOpenChange={setUserMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <User className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md bg-white">
                <div className="py-6">
                  <h3 className="text-xl font-light text-foreground mb-6">Account</h3>
                  <div className="space-y-4">
                    {isAuthenticated ? (
                      <>
                        <div className="text-sm text-muted-foreground mb-4">
                          Добро пожаловать, {user?.firstName || user?.email}!
                        </div>
                        <hr className="border-border" />
                        <div className="space-y-3">
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-muted-foreground font-light"
                            asChild
                          >
                            <Link href="/orders" onClick={() => setUserMenuOpen(false)}>
                              История заказов
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-muted-foreground font-light"
                            asChild
                          >
                            <Link href="/wishlist" onClick={() => setUserMenuOpen(false)}>
                              Избранное
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-muted-foreground font-light"
                            asChild
                          >
                            <Link href="/profile" onClick={() => setUserMenuOpen(false)}>
                              Настройки аккаунта
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-muted-foreground font-light"
                            asChild
                          >
                            <Link href="/support" onClick={() => setUserMenuOpen(false)}>
                              Помощь и поддержка
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
                            {isLogoutPending ? "Выход..." : "Выйти"}
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
                          Войти
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start font-light"
                          onClick={() => {
                            setAuthModalOpen(true)
                            setUserMenuOpen(false)
                          }}
                        >
                          Создать аккаунт
                        </Button>
                        <hr className="border-border" />
                        <div className="space-y-3">
                          <Button variant="ghost" className="w-full justify-start text-muted-foreground font-light">
                            История заказов
                          </Button>
                          <Button variant="ghost" className="w-full justify-start text-muted-foreground font-light">
                            Избранное
                          </Button>
                          <Button variant="ghost" className="w-full justify-start text-muted-foreground font-light">
                            Помощь и поддержка
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
              className="text-muted-foreground hover:text-foreground relative"
              onClick={toggleCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-foreground text-background text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
            
            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-white">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-light">MONTERO</h2>
                  </div>
                  <nav className="flex-1 px-6 py-8">
                    <ul className="space-y-6">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link href={item.href}>
                            <div 
                              className={cn(
                                "text-lg font-light transition-colors duration-300 cursor-pointer",
                                currentCategory === item.name ? "text-foreground" : "text-muted-foreground"
                              )}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </div>
                          </Link>
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
