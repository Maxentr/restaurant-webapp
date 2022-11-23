import { PlusIcon } from "@heroicons/react/20/solid"
import { useEffect, useReducer, useState } from "react"
import { useConfirmationModal } from "../../../hooks/contexts/useConfirmationModal"
import { useToast } from "../../../hooks/contexts/useToast"
import { addDrink, editDrink } from "../../../services/drink.service"
import { ApiError } from "../../../types/apiResponse.type"
import { Drink, DrinkStockSize } from "../../../types/drink.type"
import SlideOver from "../../ui/SlideOver"
import { drinkFormReducer, DRINK_INITIAL_STATE } from "./drinkFormReducer"

export type DrinkSlideOverProps = {
  toggle: () => void
  isShowing: boolean
  drink: Drink | undefined
  // eslint-disable-next-line no-unused-vars
  close: (type: "create" | "edit", inegredient: Drink) => void
}

const CREATE_SIZE_INITIAL_STATE: DrinkStockSize = {
  _id: "",
  name: "",
  price: 0,
  quantity: 0,
}

const DrinkSlideOver = ({
  toggle,
  isShowing,
  drink,
  close,
}: DrinkSlideOverProps) => {
  const { addToast } = useToast()
  const { showConfirmation } = useConfirmationModal()

  const [formData, dispatch] = useReducer(drinkFormReducer, {
    ...DRINK_INITIAL_STATE,
  })

  const [createSizeData, setCreateSizeData] = useState<DrinkStockSize>(
    CREATE_SIZE_INITIAL_STATE,
  )

  useEffect(() => {
    if (drink && isShowing) {
      dispatch({ type: "SET_DRINK", payload: drink })
    }
  }, [isShowing, drink])

  const createSize = () => {
    if (
      createSizeData.name &&
      createSizeData.price &&
      createSizeData.quantity
    ) {
      dispatch({
        type: "ADD_SIZE",
        payload: createSizeData,
      })
      setCreateSizeData(CREATE_SIZE_INITIAL_STATE)
    }
  }

  const handleSizeDeletion = async (index: number) => {
    const isConfirm = await showConfirmation({
      type: "danger",
      title: "Êtes-vous sûr de vouloir supprimer ?",
      message:
        "En supprimant cette taille cela peut avoir des conséquences sur les commandes qui l'utilisent.",
    })
    if (!isConfirm) return
    dispatch({
      type: "REMOVE_SIZE",
      payload: {
        sizeIndex: index,
      },
    })
  }

  const submitDrink = async () => {
    // Flemme de faire un vrai form
    if (!formData) return
    let response: { data: Drink } | { error: ApiError }

    if (drink) response = await editDrink(drink._id, formData as Drink)
    else response = await addDrink(formData as Drink)

    if ("data" in response) {
      addToast({
        type: "success",
        title: "Succès",
        message: `La boisson a bien été ${drink ? "modifiée" : "ajoutée"}`,
      })
      close(drink ? "edit" : "create", response.data)
    }
  }

  const SlideOverFooter = (
    <div className="flex flex-row justify-end items-center">
      <button
        onClick={submitDrink}
        className="bg-gray-900 active:bg-black text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
      >
        {!drink && <PlusIcon className="fill-white w-4 h-4" />}
        <p>{drink ? "Modifier" : "Ajouter"} la boisson</p>
      </button>
    </div>
  )

  return (
    <SlideOver
      title={drink ? "Modifier la boisson" : "Ajouter une boisson"}
      toggle={toggle}
      isShowing={isShowing}
      footer={SlideOverFooter}
    >
      <div className="flex flex-grow flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Nom de la boisson :</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={drink?.name || ""}
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
            defaultValue={drink?.description || ""}
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
          <label htmlFor="stockLeft">Quantité en stock :</label>
          <input
            type="number"
            id="stockLeft"
            name="stockLeft"
            defaultValue={+(drink?.stockLeft || 0)}
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
        <div className="flex flex-col mt-4 gap-2">
          <p>Tailles :</p>
          {formData.sizes.map((size: any, index: number) => (
            <div className="flex flex-col gap-1" key={index}>
              <div>
                <label htmlFor={`size-name-${index}`}>Nom de la taille :</label>
                <input
                  type="text"
                  id={`size-name-${index}`}
                  name={`size-name-${index}`}
                  value={size.name}
                  className="w-full border border-gray-900 rounded-md px-4 py-2 flex"
                  onChange={(e) => {
                    dispatch({
                      type: "CHANGE_SIZE",
                      sizeIndex: index,
                      payload: {
                        name: "name",
                        value: e.target.value.toString(),
                      },
                    })
                  }}
                />
              </div>
              <div className="flex flex-row gap-2">
                <div>
                  <label htmlFor={`size-price-${index}`}>Prix :</label>
                  <input
                    type="number"
                    id={`size-price-${index}`}
                    name={`size-price-${index}`}
                    min={0}
                    value={size.price}
                    className="w-full border border-gray-900 rounded-md px-4 py-2"
                    onChange={(e) => {
                      dispatch({
                        type: "CHANGE_SIZE",
                        sizeIndex: index,
                        payload: {
                          name: "price",
                          value: e.target.value.toString(),
                        },
                      })
                    }}
                  />
                </div>
                <div>
                  <label htmlFor={`size-quantity-${index}`}>Quantité :</label>
                  <input
                    type="number"
                    id={`size-quantity-${index}`}
                    name={`size-quantity-${index}`}
                    min={0}
                    value={size.quantity}
                    className="w-full border border-gray-900 rounded-md px-4 py-2"
                    onChange={(e) => {
                      dispatch({
                        type: "CHANGE_SIZE",
                        sizeIndex: index,
                        payload: {
                          name: "quantity",
                          value: e.target.value.toString(),
                        },
                      })
                    }}
                  />
                </div>
              </div>
              <button
                onClick={() => handleSizeDeletion(index)}
                className="bg-red-600 px-4 py-2 rounded-md text-white font-medium"
              >
                Supprimer la taille
              </button>
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <div>
              <label htmlFor="size-name">Nom de la taille :</label>
              <input
                type="text"
                id="size-name"
                name="size-name"
                value={createSizeData.name}
                className="w-full border border-gray-900 rounded-md px-4 py-2 flex"
                onChange={(e) => {
                  setCreateSizeData({
                    ...createSizeData,
                    name: e.target.value,
                  })
                }}
              />
            </div>
            <p>Ajouter une taille</p>
            <div className="flex flex-row gap-2">
              <div>
                <label htmlFor="size-price">Prix :</label>
                <input
                  type="number"
                  id="size-price"
                  name="size-price"
                  value={createSizeData.price}
                  min={0}
                  className="w-full border border-gray-900 rounded-md px-4 py-2"
                  onChange={(e) => {
                    setCreateSizeData({
                      ...createSizeData,
                      price: +e.target.value,
                    })
                  }}
                />
              </div>
              <div>
                <label htmlFor="size-quantity">Quantité :</label>
                <input
                  type="number"
                  id="size-quantity"
                  name="size-quantity"
                  value={createSizeData.quantity}
                  min={0}
                  className="w-full border border-gray-900 rounded-md px-4 py-2"
                  onChange={(e) => {
                    setCreateSizeData({
                      ...createSizeData,
                      quantity: +e.target.value,
                    })
                  }}
                />
              </div>
            </div>
            <button
              onClick={createSize}
              className="bg-emerald-600 px-4 py-2 rounded-md text-white font-medium"
            >
              Ajouter une taille
            </button>
          </div>
        </div>
      </div>
    </SlideOver>
  )
}

export default DrinkSlideOver
