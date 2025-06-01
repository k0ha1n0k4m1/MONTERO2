import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '@/lib/queryClient'
import { useAuth } from '@/hooks/useAuth'

export function useWishlist() {
  const { isAuthenticated, user } = useAuth()
  const queryClient = useQueryClient()

  // Always fetch wishlist but only when authenticated
  const { data: serverWishlist = [] } = useQuery({
    queryKey: ['/api/wishlist'],
    enabled: !!isAuthenticated,
    retry: false,
  })

  // Get local wishlist from localStorage for non-authenticated users
  const getLocalWishlist = () => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem('montero-wishlist')
      return stored ? JSON.parse(stored).state?.items || [] : []
    } catch {
      return []
    }
  }

  const setLocalWishlist = (items: any[]) => {
    if (typeof window === 'undefined') return
    localStorage.setItem('montero-wishlist', JSON.stringify({ state: { items } }))
  }

  // Add to wishlist mutation
  const addMutation = useMutation({
    mutationFn: async (productId: number) => {
      if (isAuthenticated) {
        return await apiRequest('POST', '/api/wishlist', { productId })
      } else {
        const localItems = getLocalWishlist()
        const newItem = { id: Date.now(), productId }
        const updatedItems = [...localItems, newItem]
        setLocalWishlist(updatedItems)
        return newItem
      }
    },
    onSuccess: () => {
      if (isAuthenticated) {
        queryClient.invalidateQueries({ queryKey: ['/api/wishlist'] })
      }
    },
  })

  // Remove from wishlist mutation
  const removeMutation = useMutation({
    mutationFn: async (productId: number) => {
      if (isAuthenticated) {
        return await apiRequest('DELETE', `/api/wishlist/${productId}`)
      } else {
        const localItems = getLocalWishlist()
        const updatedItems = localItems.filter((item: any) => item.productId !== productId)
        setLocalWishlist(updatedItems)
      }
    },
    onSuccess: () => {
      if (isAuthenticated) {
        queryClient.invalidateQueries({ queryKey: ['/api/wishlist'] })
      }
    },
  })

  const currentItems = isAuthenticated ? serverWishlist : getLocalWishlist()

  return {
    items: currentItems,
    addItem: (productId: number) => addMutation.mutate(productId),
    removeItem: (productId: number) => removeMutation.mutate(productId),
    isInWishlist: (productId: number) => currentItems.some((item: any) => item.productId === productId),
    toggleItem: (productId: number) => {
      const isInList = currentItems.some((item: any) => item.productId === productId)
      if (isInList) {
        removeMutation.mutate(productId)
      } else {
        addMutation.mutate(productId)
      }
    },
    getTotalItems: () => currentItems.length,
    clearWishlist: () => {
      if (isAuthenticated) {
        // Would need a clear endpoint on server
      } else {
        setLocalWishlist([])
      }
    },
    isLoading: addMutation.isPending || removeMutation.isPending,
  }
}