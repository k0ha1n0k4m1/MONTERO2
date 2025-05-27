import { useState } from "react"
import { Link, useLocation } from "wouter"
import { Search, User, ShoppingBag, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { cn } from "@/lib/utils"

const navigation = [
  { name: 'all', href: '/?category=all' },
  { name: 'outerwear', href: '/?category=outerwear' },
  { name: 'top', href: '/?category=top' },
  { name: 'bottom', href: '/?category=bottom' },
  { name: 'accessories', href: '/?category=accessories' },
]

export default function Header() {
  const [location] = useLocation()
  const { getTotalItems, toggleCart } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const currentCategory = new URLSearchParams(location.split('?')[1] || '').get('category') || 'all'
  const totalItems = getTotalItems()

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
                <a className={cn(
                  "text-sm font-light transition-colors duration-300 relative group",
                  currentCategory === item.name 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}>
                  {item.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300",
                    currentCategory === item.name ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </a>
              </Link>
            ))}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <User className="h-5 w-5" />
            </Button>
            
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
                            <a 
                              className={cn(
                                "text-lg font-light transition-colors duration-300",
                                currentCategory === item.name ? "text-foreground" : "text-muted-foreground"
                              )}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </a>
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
    </header>
  )
}
