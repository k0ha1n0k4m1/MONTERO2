import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistItem {
  id: number
  productId: number
  product?: {
    id: number
    name: string
    price: number
    imageUrl: string
  }
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (productId: number) => void
  removeItem: (productId: number) => void
  isInWishlist: (productId: number) => boolean
  toggleItem: (productId: number) => void
  getTotalItems: () => number
  clearWishlist: () => void
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (productId: number) => {
        const items = get().items
        const existingItem = items.find(item => item.productId === productId)
        
        if (!existingItem) {
          const newItem: WishlistItem = {
            id: Date.now(),
            productId,
          }
          set({ items: [...items, newItem] })
        }
      },
      
      removeItem: (productId: number) => {
        set({ items: get().items.filter(item => item.productId !== productId) })
      },
      
      isInWishlist: (productId: number) => {
        return get().items.some(item => item.productId === productId)
      },
      
      toggleItem: (productId: number) => {
        const isInWishlist = get().isInWishlist(productId)
        if (isInWishlist) {
          get().removeItem(productId)
        } else {
          get().addItem(productId)
        }
      },
      
      getTotalItems: () => {
        return get().items.length
      },
      
      clearWishlist: () => {
        set({ items: [] })
      },
    }),
    {
      name: 'montero-wishlist',
    }
  )
)