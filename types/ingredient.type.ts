import { ObjectId } from "./common.type"

export enum StockType {
  "LITERS",
  "KILOGRAMS",
  "UNITS",
}

export type Ingredient = {
  _id: ObjectId
  name: string
  description?: string
  category: string // Potential future id of categories collection
  stockLeft: number
  stockType: StockType
  price: number
  createdAt: Date
  updatedAt: Date
}
