import axios from "axios"
import { Menu } from "../types/menu.type"

const API_ROUTE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/menus`

export const addMenu = async (menu: Menu): Promise<Menu> => {
  const response = await axios.post(API_ROUTE_URL, menu)
  return response.data
}

export const getMenus = async (): Promise<Menu[]> => {
  const { data } = await axios.get(API_ROUTE_URL)
  return data
}

export const getMenu = async (id: string): Promise<Menu> => {
  const { data } = await axios.get(`${API_ROUTE_URL}/${id}`)
  return data
}

export const editMenu = async (id: string, menu: Menu): Promise<Menu> => {
  const response = await axios.patch(`${API_ROUTE_URL}/${id}`, menu)
  return response.data
}

export const deleteMenu = async (id: string): Promise<Menu> => {
  const { data } = await axios.delete(`${API_ROUTE_URL}/${id}`)
  return data
}
