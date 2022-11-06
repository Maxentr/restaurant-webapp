export type DishIngredient = {
  _id: string
  id: string
  quantity: number
}

export type Dish = {
  _id: string
  name: string
  description: string
  price: number
  image?: string
  category?: string
  ingredients: DishIngredient[]
  createdAt: Date
  updatedAt: Date
}
