import axios from "axios"
import { ApiResponse } from "types/apiResponse.type"
import { ObjectId } from "types/common.type"
import { Order } from "types/order.type"
import { AxiosAuthConfig, AxiosErrorHandler } from "utils/axiosHelper"

const API_ROUTE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`

export const addOrder = async (menu: Order): ApiResponse<Order> => {
  try {
    const { data } = await axios.post(API_ROUTE_URL, menu, AxiosAuthConfig)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const getOrders = async (): ApiResponse<Order[]> => {
  try {
    const { data } = await axios.get(API_ROUTE_URL, AxiosAuthConfig)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const getOrdersByCustomer = async (
  customerId: ObjectId,
): ApiResponse<Order> => {
  try {
    const { data } = await axios.get(
      `${API_ROUTE_URL}/customer/${customerId}`,
      AxiosAuthConfig,
    )
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}

export const getOrder = async (id: ObjectId): ApiResponse<Order> => {
  try {
    const { data } = await axios.get(`${API_ROUTE_URL}/${id}`, AxiosAuthConfig)
    return { data }
  } catch (e) {
    return AxiosErrorHandler(e)
  }
}
