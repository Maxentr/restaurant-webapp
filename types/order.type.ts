import { ObjectId } from "./common.type"

export enum OrderItemType {
  "MENU",
  "DRINK",
  "DISH",
}

export type OrderItemTypeString = keyof typeof OrderItemType

type OrderItemDefault = {
  _id?: ObjectId
  type: OrderItemType | OrderItemTypeString
  quantity: number
  totalPrice: number
}

export type OrderItemMenu = OrderItemDefault & {
  menu: ObjectId
  type: OrderItemType.MENU | "MENU"
  choicesId: ObjectId[]
}

export type OrderItemDish = OrderItemDefault & {
  dish: ObjectId
  type: OrderItemType.DISH | "DISH"
}

export type OrderItemDrink = OrderItemDefault & {
  drink: ObjectId
  type: OrderItemType.DRINK | "DRINK"
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
