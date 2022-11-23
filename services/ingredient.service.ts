import axios from "axios"
import { ApiResponse } from "../types/apiResponse.type"
import { ObjectId } from "../types/common.type"
import { Ingredient } from "../types/ingredient.type"
import { AxiosAuthConfig, AxiosErrorHandler } from "../utils/axiosHelper"

const API_ROUTE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/ingredients`

export const addIngredient = async (
  ingredient: Ingredient,
): ApiResponse<Ingredient> => {
  try {
    const { data } = await axios.post(
      API_ROUTE_URL,
      ingredient,
      AxiosAuthConfig,
    )
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const getIngredients = async (): ApiResponse<Ingredient[]> => {
  try {
    const { data } = await axios.get(API_ROUTE_URL)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const getIngredientsStockType = async (): ApiResponse<string[]> => {
  try {
    const { data } = await axios.get(`${API_ROUTE_URL}/stock-type`)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const getIngredient = async (id: ObjectId): ApiResponse<Ingredient> => {
  try {
    const { data } = await axios.get(`${API_ROUTE_URL}/${id}`)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const editIngredient = async (
  id: ObjectId,
  ingredient: Ingredient,
): ApiResponse<Ingredient> => {
  try {
    const { data } = await axios.patch(
      `${API_ROUTE_URL}/${id}`,
      ingredient,
      AxiosAuthConfig,
    )
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const deleteIngredient = async (
  id: ObjectId,
): ApiResponse<Ingredient> => {
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
