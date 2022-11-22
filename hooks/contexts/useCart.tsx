"use client"

import React, { createContext, useContext, useState } from "react"
import {
  Order,
  OrderItem,
  OrderItemDish,
  OrderItemDrink,
  OrderItemMenu,
  OrderItemType,
} from "../../types/order.type"

type AddCartItem = OrderItemMenu | OrderItemDish | OrderItemDrink

type CartItem = OrderItem

type CartContextInterface = Omit<
  Order,
  "_id" | "customer" | "items" | "createdAt"
> & {
  // eslint-disable-next-line no-unused-vars
  addToCart: (newItem: OrderItemMenu | OrderItemDish | OrderItemDrink) => void
  getOrder: () => Omit<Order, "_id" | "createdAt">
  // eslint-disable-next-line no-unused-vars
  removeFromCart: (id: string) => void
  cartItems: CartItem[]
}

const CartContext = createContext({} as CartContextInterface)

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)

  /**
   * Add an item to the cart
   *
   * @param {AddCartItem} newItem - The item to add to the cart
   * @returns void
   *
   * @beta
   */
  function addToCart(newItem: AddCartItem): void {
    let itemIndex
    // Check the item is already in the cart
    if (newItem.type === OrderItemType.MENU) {
      // Check for the menu
      itemIndex = cart.findIndex(
        (item) =>
          item._id === newItem._id &&
          item.type === newItem.type &&
          JSON.stringify(item.choicesId) === JSON.stringify(newItem.choicesId),
      )
    } else if (newItem.type === OrderItemType.DISH) {
      // Check for the dish
      itemIndex = cart.findIndex(
        (item) => item._id === newItem._id && item.type === newItem.type,
      )
    } else if (newItem.type === OrderItemType.DRINK) {
      // Check for the drink
      itemIndex = cart.findIndex(
        (item) =>
          item._id === newItem._id &&
          item.type === newItem.type &&
          item.sizeId === newItem.sizeId,
      )
    }

    // If the item is already in the cart, update the quantity
    if (itemIndex && itemIndex !== -1) {
      const newCart = [...cart]
      newCart[itemIndex].quantity += newItem.quantity || 1
      setCart(newCart)
      setTotal(total + newItem.totalPrice)
      return
    }

    // If the item is not in the cart, add it
    const newCart = [...cart, { ...newItem, quantity: 1 }]
    setCart(newCart)
    refreshTotal(newCart)
  }

  /**
   * Remove an item to the cart
   *
   * @param {ObjectId} id - ObjectId from MongoDB of the item
   * @returns void
   *
   * @beta
   */
  const removeFromCart = (id: string): void => {
    const newCart = cart.filter((item) => item._id !== id)
    setCart(newCart)
    refreshTotal(newCart)
  }

  const refreshTotal = (newCart: CartItem[]): void => {
    // sum of totalPrice of all newCart item by item quantity
    const newTotal = Number(
      newCart.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0),
    ).toFixed(2)
    console.log("newTotal", newTotal)

    setTotal(+newTotal)
  }

  const getOrder = () => {
    const order: Omit<Order, "_id" | "createdAt"> = {
      items: cart,
      total: total,
      customer: "ID_CUSTOMER",
    }
    return order
  }

  return (
    <CartContext.Provider
      value={{ addToCart, getOrder, removeFromCart, cartItems: cart, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
export default CartProvider
