import { CartProvider } from '../features/cart/CartContext'
import { WishlistProvider } from '../features/wishlist/WishlistContext'
import { ToastProvider } from '../features/toast/Toast'
import { QuickViewProvider } from '../features/quickview/QuickView'
import { SearchProvider } from '../features/search/SearchOverlay'

// Order matters: quick view and search use the cart, wishlist and toast.
export function Providers({ children }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
          <QuickViewProvider>
            <SearchProvider>{children}</SearchProvider>
          </QuickViewProvider>
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  )
}
