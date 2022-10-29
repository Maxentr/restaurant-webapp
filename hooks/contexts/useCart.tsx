import React, { createContext, useContext, useEffect, useState } from "react"

export type AddCartItem = {
  id: string // id of the item
  type: "menu" | "drink" | "dish" // type of the item
  totalPrice: number
  elementsId?: string[]
  quantity?: number
}

export type CartItem = {
  id: string // id of the item
  type: "menu" | "drink" | "dish" // type of the item
  elementsId?: string[]
  quantity: number
  totalPrice: number
}

type CartContextInterface = {
  // eslint-disable-next-line no-unused-vars
  addToCart: (item: AddCartItem) => void
  // eslint-disable-next-line no-unused-vars
  removeFromCart: (id: string) => void
  cart: CartItem[]
  total: number
}

const CartContext = createContext({} as CartContextInterface)

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    console.log("cart", cart)
    console.log("total", total)
  }, [cart, total])

  /**
   * Add an item to the cart
   *
   * @param {string} item.id - ObjectId from MongoDB of the item
   * @param {"menu" | "drink" | "dish"} item.type - Type of the item
   * @param {number} item.totalPrice - Price of the item
   * @optional @param {number} item.quantity - Quantity of the item
   * @optional @param {string[]} item.elementsId - Array of ObjectId from MongoDB of the elements of the item
   * @returns void
   *
   * @beta
   */
  const addToCart = ({
    id,
    type,
    totalPrice,
    elementsId,
    quantity,
  }: AddCartItem): void => {
    // Check if an item with the same id and elementsId is the same in the cart
    const itemIndex = cart.findIndex(
      (item) =>
        item.id === id &&
        item.type === type &&
        JSON.stringify(item.elementsId) === JSON.stringify(elementsId),
    )

    // If the item is already in the cart, update the quantity
    if (itemIndex !== -1) {
      const newCart = [...cart]
      newCart[itemIndex].quantity += quantity || 1
      setCart(newCart)
      setTotal(total + totalPrice)
      return
    }

    // If the item is not in the cart, add it
    const newCart = [
      ...cart,
      { id, type, elementsId, totalPrice, quantity: quantity || 1 },
    ]
    setCart(newCart)
    refreshTotal(newCart)
  }

  /**
   * Remove an item to the cart
   *
   * @param {string} id - ObjectId from MongoDB of the item
   * @returns void
   *
   * @beta
   */
  const removeFromCart = (id: string): void => {
    const newCart = cart.filter((item) => item.id !== id)
    setCart(newCart)
    refreshTotal(newCart)
  }

  const refreshTotal = (newCart: CartItem[]): void => {
    // sum of totalPrice of all newCart item by item quantity
    const newTotal = Number(
      newCart.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0),
    ).toFixed(2)

    setTotal(+newTotal)
  }

  return (
    <CartContext.Provider value={{ addToCart, removeFromCart, cart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
export default CartProvider
