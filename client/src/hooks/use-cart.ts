import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: number
  productId: number
  quantity: number
  product?: {
    id: number
    name: string
    price: number
    imageUrl: string
  }
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (productId: number, quantity?: number) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  toggleCart: () => void
  setOpen: (open: boolean) => void
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (productId: number, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.productId === productId)

          if (existingItem) {
            return {
              ...state,
              items: state.items.map(item =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            }
          } else {
            return {
              ...state,
              items: [...state.items, {
                id: Date.now(),
                productId,
                quantity
              }]
            }
          }
        })
      },

      removeItem: (id: number) => {
        set((state) => ({
          ...state,
          items: state.items.filter(item => item.id !== id)
        }))
      },

      updateQuantity: (id: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set((state) => ({
          ...state,
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          return total + (item.product?.price || 0) * item.quantity
        }, 0)
      },

      toggleCart: () => {
        set((state) => ({ ...state, isOpen: !state.isOpen }))
      },

      setOpen: (open: boolean) => {
        set((state) => ({ ...state, isOpen: open }))
      }
    }),
    {
      name: 'montero-cart'
    }
  )
)
