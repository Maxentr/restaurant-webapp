"use client"
import { DishForm, Dish, DishIngredient } from "types/dish.type"

export type DishIngredientForm = Omit<DishIngredient, "_id" | "ingredient"> & {
  ingredient: string
}

export const DISH_INITIAL_STATE: DishForm = {
  name: "",
  description: "",
  price: 0,
  image: "",
  category: "",
  ingredients: [],
}

type ActionChangeInput = {
  type: "CHANGE_INPUT"
  payload: {
    name: string
    value: string
  }
}
type ActionAddIngredient = {
  type: "ADD_INGREDIENT"
  payload: DishIngredientForm
}
type ActionChangeIngredient = {
  type: "CHANGE_INGREDIENT"
  index: number
  payload: {
    quantity: number
  }
}
type ActionRemoveIngredient = {
  type: "REMOVE_INGREDIENT"
  payload: {
    index: number
  }
}
type ActionUpdateDish = {
  type: "SET_DISH"
  payload: DishForm
}
type ActionReducer =
  | ActionChangeInput
  | ActionAddIngredient
  | ActionChangeIngredient
  | ActionRemoveIngredient
  | ActionUpdateDish

export const dishFormReducer = (
  state: DishForm | Dish,
  action: ActionReducer,
) => {
  const { type, payload } = action
  switch (type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [payload.name]: payload.value,
      } as DishForm
    case "ADD_INGREDIENT":
      return {
        ...state,
        ingredients: [...state.ingredients, payload],
      } as DishForm
    case "CHANGE_INGREDIENT":
      return {
        ...state,
        ingredients: [
          ...state.ingredients.slice(0, action.index),
          {
            ...state.ingredients[action.index],
            quantity: payload.quantity,
          },
          ...state.ingredients.slice(action.index + 1),
        ],
      } as DishForm
    case "REMOVE_INGREDIENT":
      return {
        ...state,
        ingredients: [
          ...state.ingredients.slice(0, action.payload.index),
          ...state.ingredients.slice(action.payload.index + 1),
        ],
      } as DishForm
    case "SET_DISH":
      return {
        ...payload,
      } as DishForm
    default:
      return state
  }
}
