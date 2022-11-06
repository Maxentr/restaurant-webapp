export type DrinkStockSize = {
  _id: string
  name: string
  price: number
  quantity: number
}

export type Drink = {
  _id: string
  name: string
  description: string
  image?: string
  stockLeft: number
  size: DrinkStockSize[]
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
  size: DrinkStockSize[]
}
