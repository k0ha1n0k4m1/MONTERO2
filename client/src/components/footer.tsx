import { Link } from "wouter"
import { Instagram, Twitter, Facebook } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"

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
  const { t } = useLanguage()
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
        <div className="bg-black/20 backdrop-blur rounded-[2rem] p-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-2xl font-light text-white mb-6">MONTERO</h4>
              <p className="text-white/80 font-light text-sm leading-relaxed">
                {t('brandDescription')}
              </p>
            </div>
            
            <div>
              <h5 className="text-sm font-light text-white mb-4 tracking-wide">{t('shop')}</h5>
              <ul className="space-y-3">
                <li>
                  <span 
                    onClick={(e) => handleShopClick(e, 'All Products')}
                    className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-light cursor-pointer"
                  >
                    {t('allProducts')}
                  </span>
                </li>
                <li>
                  <span 
                    onClick={(e) => handleShopClick(e, 'New Arrivals')}
                    className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-light cursor-pointer"
                  >
                    {t('newArrivals')}
                  </span>
                </li>
                <li>
                  <span 
                    onClick={(e) => handleShopClick(e, 'Sale')}
                    className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-light cursor-pointer"
                  >
                    {t('sale')}
                  </span>
                </li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm font-light text-white mb-4 tracking-wide">{t('support')}</h5>
              <ul className="space-y-3">
                <li>
                  <Link href="/contact">
                    <span className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-light cursor-pointer">
                      {t('contactUs')}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/size-guide">
                    <span className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-light cursor-pointer">
                      {t('sizeGuide')}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/returns">
                    <span className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-light cursor-pointer">
                      {t('returns')}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-sm font-light text-white mb-4 tracking-wide">{t('connect')}</h5>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/montero.co.kr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                  aria-label="Следите за нами в Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://twitter.com/montero_fashion" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                  aria-label="Следите за нами в Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="https://facebook.com/montero.fashion" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                  aria-label="Следите за нами в Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        
          <div className="border-t border-white/20 pt-8">
            <p className="text-white/80 text-sm font-light text-center">
              {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
