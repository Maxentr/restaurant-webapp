import axios from "axios"
import { ApiResponse } from "types/apiResponse.type"
import { ObjectId } from "types/common.type"
import { Dish, DishForm } from "types/dish.type"
import { AxiosAuthConfig, AxiosErrorHandler } from "utils/axiosHelper"

const API_ROUTE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/dishes`

export const addDish = async (dish: DishForm): ApiResponse<Dish> => {
  try {
    const { data } = await axios.post(API_ROUTE_URL, dish, AxiosAuthConfig)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const getDishes = async (): ApiResponse<Dish[]> => {
  try {
    const { data } = await axios.get(`${API_ROUTE_URL}`, AxiosAuthConfig)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const getDishesByArray = async (
  ids: ObjectId[],
): ApiResponse<Dish[]> => {
  try {
    const { data } = await axios.get(`${API_ROUTE_URL}/array/${ids}`)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const getDish = async (id: ObjectId): ApiResponse<Dish> => {
  try {
    const { data } = await axios.get(`${API_ROUTE_URL}/${id}`)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const editDish = async (
  id: ObjectId,
  dish: DishForm,
): ApiResponse<Dish> => {
  try {
    const { data } = await axios.patch(
      `${API_ROUTE_URL}/${id}`,
      dish,
      AxiosAuthConfig,
    )
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const deleteDish = async (id: ObjectId): ApiResponse<Dish> => {
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
