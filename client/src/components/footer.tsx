import { Link } from "wouter"
import { Instagram, Twitter, Facebook } from "lucide-react"

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/?category=all' },
    { name: 'New Arrivals', href: '/?category=all' },
    { name: 'Sale', href: '/?category=all' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Returns', href: '/returns' },
  ]
}

export default function Footer() {
  return (
    <footer className="bg-muted py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-2xl font-light text-foreground mb-6">MONTERO</h4>
            <p className="text-muted-foreground font-light text-sm leading-relaxed">
              Ultra-minimalist fashion for the modern individual.
            </p>
          </div>
          
          <div>
            <h5 className="text-sm font-light text-foreground mb-4 tracking-wide">Shop</h5>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-light">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="text-sm font-light text-foreground mb-4 tracking-wide">Support</h5>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-light">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="text-sm font-light text-foreground mb-4 tracking-wide">Connect</h5>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8">
          <p className="text-muted-foreground text-sm font-light text-center">
            © 2024 MONTERO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
