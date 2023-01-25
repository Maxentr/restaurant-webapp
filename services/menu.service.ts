import axios from "axios"
import { ApiResponse } from "types/apiResponse.type"
import { ObjectId } from "types/common.type"
import { Menu, MenuForm } from "types/menu.type"
import { AxiosAuthConfig, AxiosErrorHandler } from "utils/axiosHelper"

const API_ROUTE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/menus`

export const addMenu = async (menu: Menu): ApiResponse<Menu> => {
  try {
    const { data } = await axios.post(API_ROUTE_URL, menu, AxiosAuthConfig)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const getMenus = async (): ApiResponse<Menu[]> => {
  try {
    const { data } = await axios.get(API_ROUTE_URL)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const getMenu = async (id: ObjectId): ApiResponse<Menu> => {
  try {
    const { data } = await axios.get(`${API_ROUTE_URL}/${id}`)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const editMenu = async (id: ObjectId, menu: MenuForm): ApiResponse<Menu> => {
  try {
    const { data } = await axios.patch(
      `${API_ROUTE_URL}/${id}`,
      menu,
      AxiosAuthConfig,
    )
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const deleteMenu = async (id: ObjectId): ApiResponse<Menu> => {
  try {
    const { data } = await axios.delete(
      `${API_ROUTE_URL}/${id}`,
      AxiosAuthConfig,
    )
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}
