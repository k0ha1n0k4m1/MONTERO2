import { Link } from "wouter"
import { Instagram, Twitter, Facebook } from "lucide-react"

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/' },
    { name: 'New Arrivals', href: '/' },
    { name: 'Sale', href: '/' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Returns', href: '/returns' },
  ]
}

export default function Footer() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Если секция не найдена, перейти на главную страницу
      window.location.href = '/'
    }
  }

  const handleShopClick = (e: React.MouseEvent, linkName: string) => {
    e.preventDefault()
    if (linkName === 'All Products' || linkName === 'New Arrivals' || linkName === 'Sale') {
      scrollToProducts()
    }
  }

  return (
    <footer className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-black/20 backdrop-blur-md rounded-lg p-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-2xl font-light text-white mb-6">MONTERO</h4>
              <p className="text-white/80 font-light text-sm leading-relaxed">
                Ultra-minimalist fashion for the modern individual.
              </p>
            </div>
            
            <div>
              <h5 className="text-sm font-light text-white mb-4 tracking-wide">Shop</h5>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <span 
                      onClick={(e) => handleShopClick(e, link.name)}
                      className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-light cursor-pointer"
                    >
                      {link.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm font-light text-white mb-4 tracking-wide">Support</h5>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <span className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-light cursor-pointer">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm font-light text-white mb-4 tracking-wide">Connect</h5>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/montero_fashion" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black/80 hover:text-black transition-colors duration-300"
                  aria-label="Следите за нами в Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://twitter.com/montero_fashion" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black/80 hover:text-black transition-colors duration-300"
                  aria-label="Следите за нами в Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="https://facebook.com/montero.fashion" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black/80 hover:text-black transition-colors duration-300"
                  aria-label="Следите за нами в Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        
          <div className="border-t border-black/20 pt-8">
            <p className="text-black/80 text-sm font-light text-center">
              © 2024 MONTERO. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
