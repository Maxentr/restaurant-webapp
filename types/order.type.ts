import { ObjectId } from "./common.type"

export enum OrderItemType {
  "MENU",
  "DRINK",
  "DISH",
}

type OrderItemDefault = {
  _id: string
  type: OrderItemType
  quantity: number
  totalPrice: number
}

export type OrderItemMenu = OrderItemDefault & {
  menu: ObjectId
  type: OrderItemType.MENU
  choicesId: ObjectId[]
}

export type OrderItemDish = OrderItemDefault & {
  dish: ObjectId
  type: OrderItemType.DISH
}

export type OrderItemDrink = OrderItemDefault & {
  drink: ObjectId
  type: OrderItemType.DRINK
  sizeId: ObjectId
}

export type OrderItem = OrderItemMenu | OrderItemDish | OrderItemDrink

export type Order = {
  _id: ObjectId
  customer: ObjectId
  items: OrderItem[]
  total: number
  createdAt: Date
}
