import { ObjectId } from "./common.type"
import { Dish } from "./dish.type"
import { Drink } from "./drink.type"

type MenuChoice = {
  _id: ObjectId
  extraCost?: number
}

export interface MenuDrinkChoice extends MenuChoice {
  drink: Drink
  size: ObjectId
}

export interface MenuDishChoice extends MenuChoice {
  dish: Dish
}

export interface MenuAsideChoice extends MenuChoice {
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

// CRUD operations
type MenuChoiceForm = Omit<MenuChoice, "_id">
export interface MenuDrinkChoiceForm extends MenuChoiceForm {
  drink: ObjectId
  size: ObjectId
}

export interface MenuDishChoiceForm extends MenuChoiceForm {
  dish: ObjectId
}

export interface MenuAsideChoiceForm extends MenuChoiceForm {
  aside: ObjectId
}
export interface MenuForm
  extends Omit<
    Menu,
    "_id" | "dishes" | "asides" | "drinks" | "createdAt" | "updatedAt"
  > {
  dishes: MenuDishChoiceForm[]
  asides: MenuAsideChoiceForm[]
  drinks: MenuDrinkChoiceForm[]
}
