import { ObjectId } from "./common.type"
import { Dish } from "./dish.type"
import { Drink } from "./drink.type"

type MenuChoice = {
  _id: ObjectId
  extraCost?: number
}

export type MenuDrinkChoice = MenuChoice & {
  drink: Drink
  size: ObjectId
}

export type MenuDishChoice = MenuChoice & {
  dish: Dish
}

export type MenuAsideChoice = MenuChoice & {
  aside: Dish
}

export type Menu = {
  _id: ObjectId
  name: string
  description: string
  image?: string
  price: number
  dishes: MenuDishChoice[]
  asides: MenuAsideChoice[]
  drinks: MenuDrinkChoice[]
  createdAt: Date
  updatedAt: Date
}
