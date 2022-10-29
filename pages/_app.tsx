import "../styles/globals.css"
import type { AppProps } from "next/app"
import CartProvider from "../hooks/contexts/useCart"
import ToastProvider from "../hooks/contexts/useToast"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ToastProvider>
  )
}

export default MyApp
