import { Dish } from "./dish.type"
import { Drink } from "./drink.type"

type MenuChoice = {
  _id: string
  extraCost?: number
}

export type MenuDrinkChoice = MenuChoice & {
  drink: Drink
  size: string
}

export type MenuDishChoice = MenuChoice & {
  dish: Dish
}

export type MenuAsideChoice = MenuChoice & {
  aside: Dish
}

export type Menu = {
  _id: string
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
