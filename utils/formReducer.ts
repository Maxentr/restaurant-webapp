"use client"

// Generic types

// T keys but only the ones that are arrays
type KeyofIsArray<T> = {
  [K in keyof T]: T[K] extends readonly unknown[] ? K : never
}[keyof T]

// Check if ArrayType is an array and if it is, return the type of the array
type GetTypeFromArray<ArrayType> = ArrayType extends readonly (infer Type)[]
  ? Type
  : never

type GenericAction = {
  type: string
  payload: unknown
}

// SET_DATA
interface ActionSetData<T> extends GenericAction {
  type: "SET_DATA"
  payload: T
}

// CHANGE_INPUT
interface ActionChangeInput<T> extends GenericAction {
  type: "CHANGE_INPUT"
  payload: {
    [K in keyof T]: {
      accessor: K
      value: T[K]
    }
  }[keyof T]
}

// ADD_ARRAY_ELEMENT
interface ActionAddArrayElement<T> extends GenericAction {
  type: "ADD_ARRAY_ELEMENT"
  payload: {
    [K in keyof T]: {
      accessor: K extends KeyofIsArray<T> ? K : never
      value: GetTypeFromArray<T[K]>
    }
  }[keyof T]
}

// REMOVE_ARRAY_ELEMENT
interface ActionRemoveArrayElement<T> extends GenericAction {
  type: "REMOVE_ARRAY_ELEMENT"
  payload: {
    accessor: KeyofIsArray<T>
    index: number
  }
}

type ActionReducer<T> =
  | ActionSetData<T>
  | ActionChangeInput<T>
  | ActionAddArrayElement<T>
  | ActionRemoveArrayElement<T>

/**
 * This is a generic reducer that can be used for any object with any properties (even arrays of objects). Its limitations are that it can only handle one level of arrays.
 */
export function GenericFormReducer<T>(state: T, action: ActionReducer<T>): T {
  const { type, payload } = action
  switch (type) {
    case "SET_DATA":
      return payload
    case "CHANGE_INPUT":
      return {
        ...state,
        [payload.accessor]: payload.value,
      }
    case "ADD_ARRAY_ELEMENT":
      return {
        ...state,
        [payload.accessor]: [...(<[]>state[payload.accessor]), payload.value],
      }
    case "REMOVE_ARRAY_ELEMENT":
      return {
        ...state,
        [payload.accessor]: (<[]>state[payload.accessor]).filter(
          (el, index) => index !== payload.index,
        ),
      }
    default:
      return state
  }
}
