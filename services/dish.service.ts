import axios from "axios"
import { Dish } from "../types/dish.type"

const API_ROUTE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/dishes`

export const addDish = async (dish: Dish): Promise<Dish> => {
  const response = await axios.post(API_ROUTE_URL, dish)
  return response.data
}

export const getDishes = async (ids: string[]): Promise<Dish[]> => {
  const { data } = await axios.get(`${API_ROUTE_URL}/array/${ids}`)
  return data
}

export const getDish = async (id: string): Promise<Dish> => {
  const { data } = await axios.get(`${API_ROUTE_URL}/${id}`)
  return data
}

export const editDish = async (id: string, dish: Dish): Promise<Dish> => {
  const response = await axios.patch(`${API_ROUTE_URL}/${id}`, dish)
  return response.data
}

export const deleteDish = async (id: string): Promise<Dish> => {
  const { data } = await axios.delete(`${API_ROUTE_URL}/${id}`)
  return data
}
