import axios from "axios"
import { Ingredient } from "../types/ingredient.type"

const API_ROUTE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/ingredients`

export const addIngredient = async (
  ingredient: Ingredient,
): Promise<Ingredient> => {
  const response = await axios.post(API_ROUTE_URL, ingredient)
  return response.data
}

export const getIngredients = async (): Promise<Ingredient[]> => {
  const { data } = await axios.get(API_ROUTE_URL)
  return data
}

export const getIngredientsStockType = async (): Promise<string[]> => {
  const { data } = await axios.get(`${API_ROUTE_URL}/stock-type`)
  return data
}

export const getIngredient = async (id: string): Promise<Ingredient> => {
  const { data } = await axios.get(`${API_ROUTE_URL}/${id}`)
  return data
}

export const editIngredient = async (
  id: string,
  ingredient: Ingredient,
): Promise<Ingredient> => {
  const response = await axios.patch(`${API_ROUTE_URL}/${id}`, ingredient)
  return response.data
}

export const deleteIngredient = async (id: string): Promise<Ingredient> => {
  const { data } = await axios.delete(`${API_ROUTE_URL}/${id}`)
  return data
}
