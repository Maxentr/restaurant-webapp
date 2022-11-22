import { ObjectId } from "./common.type"

export type DrinkStockSize = {
  _id: ObjectId
  name: string
  price: number
  quantity: number
}

export type Drink = {
  _id: ObjectId
  name: string
  description: string
  image?: string
  stockLeft: number
  sizes: DrinkStockSize[]
  createdAt: Date
  updatedAt: Date
}

export type CreateDrinkStockSize = {
  name: string
  price: number
  quantity: number
}

export type CreateDrink = {
  name: string
  description: string
  image?: string
  stockLeft: number
  sizes: DrinkStockSize[]
}
