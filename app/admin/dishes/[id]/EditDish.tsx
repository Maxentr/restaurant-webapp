"use client"

import { ArrowLeftIcon, PlusIcon, TrashIcon } from "@heroicons/react/20/solid"
import { useEffect, useReducer, useState } from "react"
import { useToast } from "hooks/contexts/useToast"
import { DishForm, Dish } from "types/dish.type"
import {
  dishFormReducer,
  DishIngredientForm,
  DISH_INITIAL_STATE,
} from "./dishFormReducer"
import { editDish } from "services/dish.service"
import { Ingredient } from "types/ingredient.type"
import { ObjectId } from "types/common.type"
import { useRouter } from "next/navigation"

type Props = {
  dish: Dish
  ingredients: Ingredient[]
}
const EditDish = ({ dish, ingredients }: Props) => {
  const router = useRouter()
  const { addToast } = useToast()

  const [formData, dispatch] = useReducer(dishFormReducer, DISH_INITIAL_STATE)

  useEffect(() => {
    dispatch({ type: "SET_DISH", payload: dish })
  }, [dish])

  const availableIngredients = ingredients.filter(
    (ingredient) =>
      !formData.ingredients.find(
        (dishIngredient) => dishIngredient.ingredient === ingredient._id,
      ),
  )

  const [createIngredientData, setCreateIngredientData] =
    useState<DishIngredientForm>({
      ingredient: availableIngredients?.[0]?._id,
      quantity: 1,
    })

  useEffect(() => {
    const availableIngredients = ingredients
      .filter(
        (ingredient) =>
          !formData.ingredients.find(
            (dishIngredient) => dishIngredient.ingredient === ingredient._id,
          ),
      )
      .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))

    setCreateIngredientData({
      ingredient: availableIngredients?.[0]?._id,
      quantity: 1,
    })
  }, [formData.ingredients])

  const createIngredient = () => {
    console.log(createIngredientData)
    if (createIngredientData.ingredient && createIngredientData.quantity) {
      dispatch({
        type: "ADD_INGREDIENT",
        payload: createIngredientData,
      })
    }
  }

  const handleIngredientDeletion = (index: number) => {
    dispatch({
      type: "REMOVE_INGREDIENT",
      payload: {
        index: index,
      },
    })
  }

  const submitDish = async () => {
    // Flemme de faire un vrai form
    if (!formData) return
    const modifiedDish = await editDish(dish._id, formData as DishForm)

    if ("data" in modifiedDish) {
      addToast({
        type: "success",
        title: "Succès",
        message: `Le plat a bien été modifié"`,
      })
      router.push("/admin/dishes")
    }
  }

  const getIngredientNameById = (id: ObjectId) => {
    return ingredients.find((ingredient) => ingredient._id === id)?.name || ""
  }

  return (
    <div className="flex flex-grow flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <button
          onClick={() => router.back()}
          className="text-gray-900 px-4 py-2 rounded-md flex items-center justify-center gap-2"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <p className="text-lg">Retour</p>
        </button>
        <button
          onClick={submitDish}
          className="bg-gray-900 active:bg-black text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
        >
          <p>Modifier le plat</p>
        </button>
      </div>
      <h1 className="text-xl mt-4">Modifier le plat</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Nom du plat :</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nom du plat"
          defaultValue={dish?.name || ""}
          className="border border-gray-900 rounded-md px-4 py-2"
          onChange={(e) => {
            dispatch({
              type: "CHANGE_INPUT",
              payload: {
                name: e.target.name.toString(),
                value: e.target.value.toString(),
              },
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
          placeholder="Description du plat"
          defaultValue={dish?.description || ""}
          className="border border-gray-900 rounded-md px-4 py-2"
          onChange={(e) => {
            dispatch({
              type: "CHANGE_INPUT",
              payload: {
                name: e.target.name.toString(),
                value: e.target.value.toString(),
              },
            })
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="price">Prix :</label>
        <input
          type="number"
          id="price"
          name="price"
          defaultValue={+(dish?.price || 0)}
          className="border border-gray-900 rounded-md px-4 py-2"
          onChange={(e) => {
            dispatch({
              type: "CHANGE_INPUT",
              payload: {
                name: e.target.name.toString(),
                value: e.target.value.toString(),
              },
            })
          }}
        />
      </div>
      <div>
        <div className="mt-8 flex flex-row gap-4 items-end">
          <div className="flex flex-grow flex-col gap-2">
            <label htmlFor="ingredient">Ajouter un ingredient :</label>
            <select
              name="ingredient"
              id="ingredient"
              className="border border-gray-900 rounded-md px-4 py-2 bg-white h-[2.625rem]"
              disabled={!availableIngredients.length}
              placeholder="Ingredient"
              value={createIngredientData.ingredient}
              onChange={(e) =>
                setCreateIngredientData({
                  ...createIngredientData,
                  ingredient: e.target.value as ObjectId,
                })
              }
            >
              {availableIngredients.length > 0 ? (
                availableIngredients.map((ingredient) => (
                  <option key={ingredient._id} value={ingredient._id}>
                    {ingredient.name}
                  </option>
                ))
              ) : (
                <option value="">Aucun ingredient disponible</option>
              )}
            </select>
          </div>
          <div className="flex flex-grow flex-col gap-2">
            <label htmlFor="quantity">Quantité :</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={createIngredientData.quantity}
              disabled={!availableIngredients.length}
              min={1}
              className="border border-gray-900 rounded-md px-4 py-2"
              onChange={(e) =>
                setCreateIngredientData({
                  ...createIngredientData,
                  quantity: +e.target.value,
                })
              }
            />
          </div>
          <button
            onClick={createIngredient}
            className="bg-emerald-600 active:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 h-[2.625rem]"
          >
            <PlusIcon className="fill-white w-4 h-4" />
            <p>Ajouter l&apos;ingrédient</p>
          </button>
        </div>

        <div className="flex flex-row pt-4 pb-2 border-b border-gray-500 items-center">
          <p>Ingrédients utilisées</p>
        </div>
        {formData.ingredients.length > 0 ? (
          formData.ingredients.map((ingredient, index) => (
            <div
              key={JSON.stringify(ingredient)}
              className="flex flex-row py-3 px-2 border-b last:border-b-0 border-gray-300 items-center gap-4"
            >
              <p className="flex flex-grow">
                {getIngredientNameById(ingredient.ingredient as string)}
              </p>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={ingredient.quantity}
                min={1}
                className="border-none bg-gray-50"
                onChange={(e) => {
                  ;+e.target.value > 0 &&
                    dispatch({
                      type: "CHANGE_INGREDIENT",
                      index: index,
                      payload: {
                        quantity: +e.target.value,
                      },
                    })
                }}
              />
              <TrashIcon
                onClick={() => handleIngredientDeletion(index)}
                className="fill-red-500 w-6 h-6 cursor-pointer"
              />
            </div>
          ))
        ) : (
          <p className="flex flex-grow">
            Ce plat n&apos;a pas d&apos;ingrédient... Hein !?
          </p>
        )}
      </div>
    </div>
  )
}

export default EditDish
