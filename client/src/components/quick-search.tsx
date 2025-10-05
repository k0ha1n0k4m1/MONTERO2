import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import { Link } from "wouter"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@shared/schema"

interface QuickSearchProps {
  isOpen: boolean
  onClose: () => void
}

export default function QuickSearch({ isOpen, onClose }: QuickSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showResults, setShowResults] = useState(false)

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    enabled: searchTerm.length > 2,
  })

  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  ).slice(0, 6)

  useEffect(() => {
    setShowResults(searchTerm.length > 2 && filteredProducts.length > 0)
  }, [searchTerm, filteredProducts.length])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-start justify-center pt-20">
      <div className="bg-black/90 backdrop-blur rounded-[2rem] p-8 w-full max-w-2xl mx-6 border border-white/20">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder-white/60 rounded-full text-lg focus:border-white/40"
            autoFocus
          />
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isLoading && searchTerm.length > 2 && (
          <div className="mt-6 text-center text-white/60">
            <div className="animate-spin w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full mx-auto"></div>
          </div>
        )}

        {showResults && (
          <div className="mt-6 space-y-4">
            <h3 className="text-white/80 text-sm font-light tracking-wide uppercase">Search Results</h3>
            <div className="space-y-3">
              {filteredProducts.map((product: Product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-colors duration-300 group"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/5">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-light group-hover:text-white/90 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-white/60 text-sm font-light">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}

        {searchTerm.length > 2 && !isLoading && filteredProducts.length === 0 && (
          <div className="mt-6 text-center text-white/60">
            <p className="font-light">No products found for "{searchTerm}"</p>
          </div>
        )}

        {searchTerm.length <= 2 && searchTerm.length > 0 && (
          <div className="mt-6 text-center text-white/60">
            <p className="font-light">Type at least 3 characters to search</p>
          </div>
        )}
      </div>
    </div>
  )
}