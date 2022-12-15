"use client"

import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid"
import { useEffect, useReducer } from "react"
import { DishForm, Dish, DishIngredientForm } from "types/dish.type"
import { Ingredient } from "types/ingredient.type"
import { ObjectId } from "types/common.type"
import { genericFormReducer } from "utils/formReducer"
import Select from "components/ui/Select"
import Input from "components/ui/Input"

type Props = {
  dish?: Dish
  ingredients: Ingredient[]
  // eslint-disable-next-line no-unused-vars
  onChange: (dish: DishForm) => void
}

const DISH_INITIAL_STATE: DishForm = {
  name: "",
  description: "",
  price: 0,
  image: "",
  category: "",
  ingredients: [],
}

const ManageDish = ({ dish, ingredients, onChange }: Props) => {
  const [formData, dispatch] = useReducer(
    genericFormReducer<DishForm>,
    DISH_INITIAL_STATE,
  )
  const availableIngredients = ingredients.filter(
    (ingredient) =>
      !formData.ingredients.find(
        (dishIngredient) => dishIngredient.ingredient === ingredient._id,
      ),
  )
  const [ingredientData, dispatchIngredient] = useReducer(
    genericFormReducer<DishIngredientForm>,
    {
      ingredient: availableIngredients?.[0]?._id,
      quantity: 1,
    },
  )

  // Used to update the form data when a dish is edited
  useEffect(() => {
    const isEdition = dish !== undefined
    if (isEdition) dispatch({ type: "SET_DATA", payload: dish as DishForm })
  }, [dish])

  // Return data to parent component
  useEffect(() => {
    onChange(formData)
  }, [formData, onChange])

  // Update the available ingredients when the form ingredients change
  useEffect(() => {
    const availableIngredients = ingredients
      .filter(
        (ingredient) =>
          !formData.ingredients.find(
            (dishIngredient) => dishIngredient.ingredient === ingredient._id,
          ),
      )
      .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))

    dispatchIngredient({
      type: "SET_DATA",
      payload: {
        ingredient: availableIngredients?.[0]?._id,
        quantity: 1,
      },
    })
  }, [formData.ingredients, ingredients])

  const createIngredient = () => {
    if (ingredientData.ingredient && ingredientData.quantity) {
      dispatch({
        type: "ADD_ARRAY_ELEMENT",
        payload: {
          accessor: "ingredients",
          value: ingredientData,
        },
      })
    }
  }

  const handleIngredientDeletion = (index: number) => {
    dispatch({
      type: "REMOVE_ARRAY_ELEMENT",
      payload: {
        accessor: "ingredients",
        index: index,
      },
    })
  }

  const getIngredientNameById = (id: ObjectId) => {
    return ingredients.find((ingredient) => ingredient._id === id)?.name || ""
  }

  return (
    <>
      <Input
        label="Nom du plat"
        name="name"
        placeholder="Nom du plat"
        defaultValue={dish?.name}
        onChange={(e) =>
          dispatch({
            type: "CHANGE_INPUT",
            payload: {
              accessor: "name",
              value: e.target.value,
            },
          })
        }
      />
      <Input
        label="Description"
        name="description"
        placeholder="Description du plat"
        defaultValue={dish?.description}
        onChange={(e) =>
          dispatch({
            type: "CHANGE_INPUT",
            payload: {
              accessor: "description",
              value: e.target.value,
            },
          })
        }
      />
      <Input
        type="number"
        label="Prix"
        name="price"
        defaultValue={dish?.price}
        min={1}
        onChange={(e) =>
          dispatch({
            type: "CHANGE_INPUT",
            payload: {
              accessor: "price",
              value: +e.target.value,
            },
          })
        }
      />
      <Input
        label="Catégorie"
        name="category"
        defaultValue={dish?.category}
        onChange={(e) =>
          dispatch({
            type: "CHANGE_INPUT",
            payload: {
              accessor: "category",
              value: e.target.value,
            },
          })
        }
      />
      <div>
        <div className="mt-8 flex flex-row gap-4 items-end">
          <Select<Ingredient>
            name="ingredient"
            label="Ingrédient"
            noDataMessage="Aucun ingrédient disponible"
            disabled={!availableIngredients.length}
            data={availableIngredients}
            accessor={{
              display: "name",
              value: "_id",
            }}
            value={ingredientData.ingredient}
            onChange={(e) =>
              dispatchIngredient({
                type: "CHANGE_INPUT",
                payload: {
                  accessor: "ingredient",
                  value: e.target.value as ObjectId,
                },
              })
            }
          />
          <Input
            type="number"
            label="Quantité"
            name="quantity"
            min={1}
            defaultValue={ingredientData.quantity}
            disabled={!availableIngredients.length}
            onChange={(e) =>
              dispatchIngredient({
                type: "CHANGE_INPUT",
                payload: {
                  accessor: "quantity",
                  value: +e.target.value,
                },
              })
            }
          />
          <button
            onClick={createIngredient}
            className="bg-emerald-600 active:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 h-[2.625rem]"
          >
            <PlusIcon className="fill-white w-4 h-4" />
            <p>Ajouter l&apos;ingrédient</p>
          </button>
        </div>

        <div className="flex flex-row pt-4 pb-2 border-b border-gray-500 items-center">
          <p>Ingrédients utilisés</p>
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
                      type: "EDIT_ARRAY_ELEMENT",
                      payload: {
                        accessor: "ingredients",
                        index,
                        value: {
                          ...ingredient,
                          quantity: +e.target.value,
                        },
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
          <p className="flex flex-grow">Aucun ingrédient n&apos;a été ajouté</p>
        )}
      </div>
    </>
  )
}

export default ManageDish
