import "../styles/globals.css"
import CartProvider from "../hooks/contexts/useCart"
import ToastProvider from "../hooks/contexts/useToast"
import ConfirmationModalProvider from "../hooks/contexts/useConfirmationModal"
import { ReactNode } from "react"

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <CartProvider>
            <ConfirmationModalProvider>{children}</ConfirmationModalProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  )
}

export default RootLayout
