import { ObjectId } from "./common.type"
import { Ingredient } from "./ingredient.type"

export type DishIngredient = {
  _id: ObjectId
  ingredient: ObjectId | Ingredient
  quantity: number
}

export type Dish = {
  _id: ObjectId
  name: string
  description: string
  price: number
  image?: string
  category?: string
  ingredients: DishIngredient[]
  createdAt: Date
  updatedAt: Date
}

// CRUD operations

export type DishForm = Omit<Dish, "_id" | "createdAt" | "updatedAt">
