import { Dish } from "./dish.type"
import { Drink } from "./drink.type"

export type MenuDrinkChoice = {
  size: string
  extraCost?: number
} & { [k: string]: Drink }

export type MenuDishChoice = {
  extraCost?: number
} & { [k: string]: Dish }

export type Menu = {
  _id: string
  name: string
  description: string
  image?: string
  price: number
  dishes: MenuDishChoice[]
  asides: MenuDishChoice[]
  drinks: MenuDrinkChoice[]
  createdAt: Date
  updatedAt: Date
}
