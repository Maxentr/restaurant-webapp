import axios from "axios"
import { Drink } from "../types/drink.type"

const API_ROUTE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/drinks`

export const addDrink = async (drink: Drink): Promise<Drink> => {
  const response = await axios.post(API_ROUTE_URL, drink)
  return response.data
}

export const getDrinks = async (): Promise<Drink[]> => {
  const { data } = await axios.get(API_ROUTE_URL)
  return data
}

export const getDrinksByArray = async (ids: string[]): Promise<Drink[]> => {
  const { data } = await axios.get(`${API_ROUTE_URL}/array/${ids}`)
  return data
}

export const getDrink = async (id: string): Promise<Drink> => {
  const { data } = await axios.get(`${API_ROUTE_URL}/${id}`)
  return data
}

export const editDrink = async (id: string, drink: Drink): Promise<Drink> => {
  const response = await axios.patch(`${API_ROUTE_URL}/${id}`, drink)
  return response.data
}

export const deleteDrink = async (id: string): Promise<Drink> => {
  const { data } = await axios.delete(`${API_ROUTE_URL}/${id}`)
  return data
}
