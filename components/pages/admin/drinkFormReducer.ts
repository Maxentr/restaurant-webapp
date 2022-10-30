import { Drink, DrinkStockSize } from "../../../types/drink.type"

export const DRINK_INITIAL_STATE: Drink = {
  _id: "",
  name: "",
  description: "",
  image: "",
  stockLeft: 0,
  size: [],
  createdAt: new Date(),
  updatedAt: new Date(),
}

type ActionChangeInput = {
  type: "CHANGE_INPUT"
  payload: {
    name: string
    value: string
  }
}
type ActionAddSize = {
  type: "ADD_SIZE"
  payload: DrinkStockSize
}

type ActionChangeSize = {
  type: "CHANGE_SIZE"
  sizeIndex: number
  payload: {
    name: string
    value: string
  }
}

type ActionRemoveSize = {
  type: "REMOVE_SIZE"
  payload: {
    sizeIndex: number
  }
}
type ActionUpdateDrink = {
  type: "SET_DRINK"
  payload: Drink
}
type ActionReducer =
  | ActionChangeInput
  | ActionAddSize
  | ActionChangeSize
  | ActionRemoveSize
  | ActionUpdateDrink

export const drinkFormReducer = (state: Drink, action: ActionReducer) => {
  const { type, payload } = action
  switch (type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [payload.name]: payload.value,
      }
    case "ADD_SIZE":
      return {
        ...state,
        size: [...state.size, payload],
      }
    case "CHANGE_SIZE":
      return {
        ...state,
        size: [
          ...state.size.slice(0, action.sizeIndex),
          { ...state.size[action.sizeIndex], [payload.name]: payload.value },
          ...state.size.slice(action.sizeIndex + 1),
        ],
      }
    case "REMOVE_SIZE":
      return {
        ...state,
        size: [
          ...state.size.slice(0, action.payload.sizeIndex),
          ...state.size.slice(action.payload.sizeIndex + 1),
        ],
      }
    case "SET_DRINK":
      return {
        ...payload,
      }
    default:
      return state
  }
}
