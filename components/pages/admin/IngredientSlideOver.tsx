import { PlusIcon } from "@heroicons/react/20/solid"
import { useEffect, useReducer, useState } from "react"
import { useToast } from "../../../hooks/contexts/useToast"
import {
  addIngredient,
  editIngredient,
  getIngredientsStockType,
} from "../../../services/ingredient.service"
import { Ingredient } from "../../../types/ingredient.type"
import SlideOver from "../../ui/SlideOver"

export type IngredientSlideOverProps = {
  toggle: () => void
  isShowing: boolean
  ingredient: Ingredient | undefined
  // eslint-disable-next-line no-unused-vars
  close: (type: "create" | "edit", inegredient: Ingredient) => void
}

interface Action {
  name: string
  value: string
}

const formReducer = (state: Object, action: Action) => {
  const { name, value } = action
  return {
    ...state,
    [name]: value,
  }
}

const IngredientSlideOver = ({
  toggle,
  isShowing,
  ingredient,
  close,
}: IngredientSlideOverProps) => {
  const { addToast } = useToast()
  const [formData, dispatch] = useReducer(formReducer, { ...ingredient })
  const [stockTypes, setStockTypes] = useState<string[]>([])

  useEffect(() => {
    const getAndSetStockTypes = async () => {
      const response = await getIngredientsStockType()
      if ("data" in response) setStockTypes(response.data)
    }
    getAndSetStockTypes()
  }, [])

  const submitIngredient = async () => {
    // Flemme de faire un vrai form
    if (!formData) return

    if (ingredient) {
      const response = await editIngredient(
        ingredient._id,
        formData as Ingredient,
      )
      if ("data" in response) {
        addToast({
          type: "success",
          title: "Succès",
          message: "L'ingrédient a bien été modifié",
        })
        close("edit", response.data)
      }
    } else {
      const response = await addIngredient(formData as Ingredient)
      if ("data" in response) {
        addToast({
          type: "success",
          title: "Succès",
          message: "L'ingrédient a bien été ajouté",
        })
        close("create", response.data)
      }
    }
  }

  const SlideOverFooter = (
    <div className="flex flex-row justify-end items-center">
      <button
        onClick={submitIngredient}
        className="bg-gray-900 active:bg-black text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
      >
        {!ingredient && <PlusIcon className="fill-white w-4 h-4" />}
        <p>{ingredient ? "Modifier" : "Ajouter"} l&apos;ingredient</p>
      </button>
    </div>
  )

  return (
    <SlideOver
      title={ingredient ? "Modifier l'ingredient" : "Ajouter un ingredient"}
      toggle={toggle}
      isShowing={isShowing}
      footer={SlideOverFooter}
    >
      <div className="flex flex-grow flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nom de l&apos;ingredient :</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={ingredient?.name || ""}
            className="border border-gray-900 rounded-md px-4 py-2"
            onChange={(e) => {
              dispatch({
                name: e.target.name.toString(),
                value: e.target.value.toString(),
              })
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description :</label>
          <input
            type="text"
            id="description"
            name="description"
            defaultValue={ingredient?.description || ""}
            className="border border-gray-900 rounded-md px-4 py-2"
            onChange={(e) => {
              dispatch({
                name: e.target.name.toString(),
                value: e.target.value.toString(),
              })
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="stockLeft">Quantité en stock :</label>
          <input
            type="number"
            id="stockLeft"
            name="stockLeft"
            defaultValue={+(ingredient?.stockLeft || 0)}
            className="border border-gray-900 rounded-md px-4 py-2"
            onChange={(e) => {
              dispatch({
                name: e.target.name.toString(),
                value: e.target.value.toString(),
              })
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="stockType">Unité de stockage :</label>
          <select
            name="stockType"
            id="stockType"
            className="border border-gray-900 rounded-md px-4 py-2 bg-white h-[42px]"
            defaultValue={ingredient?.stockType && ingredient?.stockType}
            onChange={(e) => {
              dispatch({
                name: e.target.name.toString(),
                value: e.target.value.toString(),
              })
            }}
          >
            {stockTypes.map((stockType) => (
              <option key={stockType} value={stockType}>
                {stockType}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price">Prix en € :</label>
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={+(ingredient?.price || 0)}
            className="border border-gray-900 rounded-md px-4 py-2"
            onChange={(e) => {
              dispatch({
                name: e.target.name.toString(),
                value: e.target.value.toString(),
              })
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category">Categorie :</label>
          <input
            type="text"
            id="category"
            name="category"
            defaultValue={ingredient?.category || ""}
            className="border border-gray-900 rounded-md px-4 py-2"
            onChange={(e) => {
              dispatch({
                name: e.target.name.toString(),
                value: e.target.value.toString(),
              })
            }}
          />
        </div>
      </div>
    </SlideOver>
  )
}

export default IngredientSlideOver
