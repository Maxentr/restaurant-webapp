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
export interface DishIngredientForm
  extends Omit<DishIngredient, "_id" | "ingredient"> {
  ingredient: string
}
export interface DishForm
  extends Omit<Dish, "_id" | "ingredients" | "createdAt" | "updatedAt"> {
  ingredients: DishIngredientForm[]
}
