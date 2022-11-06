export enum StockType {
  LITERS = "LITERS",
  KILOGRAMS = "KILOGRAMS",
  UNITS = "UNITS",
}

export type Ingredient = {
  _id: string
  name: string
  description?: string
  category: string // Potential future id of categories collection
  stockLeft: number
  stockType: StockType
  price: number
  createdAt: Date
  updatedAt: Date
}
