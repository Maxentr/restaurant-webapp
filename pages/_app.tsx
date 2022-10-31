import "../styles/globals.css"
import type { AppProps } from "next/app"
import CartProvider from "../hooks/contexts/useCart"
import ToastProvider from "../hooks/contexts/useToast"
import ConfirmationModalProvider from "../hooks/contexts/useConfirmationModal"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <CartProvider>
        <ConfirmationModalProvider>
          <Component {...pageProps} />
        </ConfirmationModalProvider>
      </CartProvider>
    </ToastProvider>
  )
}

export default MyApp
