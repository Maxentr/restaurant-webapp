import React, { useEffect, useReducer, useState } from "react"
import { Dish } from "types/dish.type"
import { Drink } from "types/drink.type"
import { Menu, MenuDishChoiceForm, MenuForm } from "types/menu.type"
import { genericFormReducer } from "utils/formReducer"
import Input from "components/ui/Input"
import Select from "components/ui/Select"
import { ObjectId } from "types/common.type"
import { create } from "domain"
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid"

type Props = {
  menu: Menu
  dishes: Dish[]
  drinks: Drink[]
  // eslint-disable-next-line no-unused-vars
  onChange: (dish: MenuForm) => void
}

const MENU_INITIAL_STATE: MenuForm = {
  name: "",
  description: "",
  price: 0,
  image: "",
  dishes: [],
  asides: [],
  drinks: [],
}

const ManageMenu = ({ menu, dishes, drinks, onChange }: Props) => {
  const [formData, dispatch] = useReducer(
    genericFormReducer<MenuForm>,
    MENU_INITIAL_STATE,
  )
  const availableDishes = dishes.filter(
    (dish) => !formData.dishes.find((dishForm) => dishForm.dish === dish._id),
  )

  const [dishData, dispatchDish] = useReducer(
    genericFormReducer<MenuDishChoiceForm>,
    {
      dish: availableDishes?.[0]?._id,
    },
  )

  // Used to update the form data when a menu is edited
  useEffect(() => {
    const isEdition = menu !== undefined
    if (isEdition) {
      // Menu cannot be assigned directly to the form data
      const formatedMenu: MenuForm = {
        ...menu,
        dishes: menu.dishes.map((dish) => ({
          ...dish,
          dish: dish.dish._id,
        })),
        asides: menu.asides.map((aside) => {
          console.log(aside)
          return {
            ...aside,
            aside: aside.aside._id,
          }
        }),
        drinks: menu.drinks.map((drink) => ({
          ...drink,
          drink: drink.drink._id,
          size: drink.size,
        })),
      }
      dispatch({ type: "SET_DATA", payload: formatedMenu })
    }
  }, [menu])

  useEffect(() => {
    onChange(formData)
  }, [formData, onChange])

  // Add dish to the form
  const createDish = () => {
    if (dishData.dish) {
      dispatch({
        type: "ADD_ARRAY_ELEMENT",
        payload: {
          accessor: "dishes",
          value: dishData,
        },
      })
    }
  }
  // When dishes in the form change, update the available dishes and reset the dish form
  useEffect(() => {
    const availableDishes = dishes
      .filter(
        (dish) =>
          !formData.dishes.find((dishForm) => dishForm.dish === dish._id),
      )
      .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))

    dispatchDish({
      type: "SET_DATA",
      payload: {
        dish: availableDishes?.[0]?._id,
      },
    })
  }, [dishes, formData.dishes])

  const handleIngredientDeletion = (index: number) => {
    dispatch({
      type: "REMOVE_ARRAY_ELEMENT",
      payload: {
        accessor: "dishes",
        index: index,
      },
    })
  }

  const getDishNameById = (id: ObjectId) => {
    return dishes.find((dish) => dish._id === id)?.name || ""
  }

  return (
    <>
      <Input
        label="Nom du menu"
        name="name"
        defaultValue={menu.name}
        placeholder="Nom du menu"
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
        defaultValue={menu.description}
        placeholder="Description du menu"
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
        defaultValue={menu.price}
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
      <div>
        <div className="mt-8 flex flex-row gap-4 items-end">
          <Select
            name="dish"
            label="Plat"
            noDataMessage="Aucun ingrédient disponible"
            disabled={!availableDishes.length}
            data={availableDishes}
            accessor={{
              display: "name",
              value: "_id",
            }}
            value={dishData.dish}
            onChange={(e) =>
              dispatchDish({
                type: "CHANGE_INPUT",
                payload: {
                  accessor: "dish",
                  value: e.target.value,
                },
              })
            }
          />
          <Input
            type="number"
            label="Prix supplémentaire"
            name="extraCost"
            min={0}
            disabled={!availableDishes.length}
            onChange={(e) =>
              dispatchDish({
                type: "CHANGE_INPUT",
                payload: {
                  accessor: "extraCost",
                  value: +e.target.value,
                },
              })
            }
          />
          <button
            onClick={createDish}
            className="bg-emerald-600 active:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 h-[2.625rem]"
          >
            <PlusIcon className="fill-white w-4 h-4" />
            <p>Ajouter le plat</p>
          </button>
        </div>

        <div className="flex flex-row pt-4 pb-2 border-b border-gray-500 items-center">
          <p>Choix de plat :</p>
        </div>
        {formData.dishes.length > 0 ? (
          formData.dishes.map((dish, index) => (
            <div
              key={JSON.stringify(dish)}
              className="flex flex-row py-3 px-2 border-b last:border-b-0 border-gray-300 items-center gap-4"
            >
              <p className="flex flex-grow">
                {getDishNameById(dish.dish as ObjectId)}
              </p>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={dish.extraCost}
                min={0}
                className="border-none bg-gray-50"
                onChange={(e) => {
                  ;+e.target.value > 0 &&
                    dispatch({
                      type: "EDIT_ARRAY_ELEMENT",
                      payload: {
                        accessor: "dishes",
                        index,
                        value: {
                          ...dish,
                          extraCost: +e.target.value,
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

export default ManageMenu
