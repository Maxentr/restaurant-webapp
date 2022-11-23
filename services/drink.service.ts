import axios from "axios"
import { ApiResponse } from "../types/apiResponse.type"
import { ObjectId } from "../types/common.type"
import { Drink } from "../types/drink.type"
import { AxiosAuthConfig, AxiosErrorHandler } from "../utils/axiosHelper"

const API_ROUTE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/drinks`

export const addDrink = async (drink: Drink): ApiResponse<Drink> => {
  try {
    const { data } = await axios.post(API_ROUTE_URL, drink, AxiosAuthConfig)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const getDrinks = async (): ApiResponse<Drink[]> => {
  try {
    const { data } = await axios.get(API_ROUTE_URL)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const getDrinksByArray = async (ids: ObjectId[]): ApiResponse<Drink[]> => {
  try {
    const { data } = await axios.get(`${API_ROUTE_URL}/array/${ids}`)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const getDrink = async (id: ObjectId): ApiResponse<Drink> => {
  try {
    const { data } = await axios.get(`${API_ROUTE_URL}/${id}`)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const editDrink = async (
  id: ObjectId,
  drink: Drink,
): ApiResponse<Drink> => {
  try {
    const { data } = await axios.patch(
      `${API_ROUTE_URL}/${id}`,
      drink,
      AxiosAuthConfig,
    )
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const deleteDrink = async (id: ObjectId): ApiResponse<Drink> => {
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
