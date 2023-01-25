"use client"

import { useState } from "react"
import { Ingredient, StockType } from "types/ingredient.type"
import { deleteIngredient } from "services/ingredient.service"
import RCTable from "rc-table"
import { PencilIcon } from "@heroicons/react/24/solid"
import { TrashIcon } from "@heroicons/react/20/solid"
import { ColumnsType, DefaultRecordType } from "rc-table/lib/interface"
import { useToast } from "hooks/contexts/useToast"
import IngredientSlideOver from "components/pages/admin/IngredientSlideOver"
import useModal from "hooks/useModal"
import { useConfirmationModal } from "hooks/contexts/useConfirmationModal"
import { useRouter } from "next/navigation"

type Props = {
  ingredients: Ingredient[]
}
const IngredientsManagement = ({ ingredients }: Props) => {
  const { refresh } = useRouter()
  const { addToast } = useToast()
  const { isShowing, toggle } = useModal()
  const { showConfirmation } = useConfirmationModal()

  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>()

  const columns: ColumnsType<DefaultRecordType> = [
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
      className: "text-left px-4 border-l border-y border-gray-200 py-2",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      className: "text-left px-4 border-y border-gray-200 py-2",
    },
    {
      title: "Prix",
      render: (row: Ingredient) => `${row.price} €`,
      key: "price",
      className: "text-left px-4 border-y border-gray-200 py-2",
    },
    {
      title: "Quantité en stock",
      render: (row: Ingredient) => `${row.stockLeft}`,
      key: "stockLeft",
      className: "text-left px-4 border-y border-gray-200 py-2",
    },
    {
      title: "Type de stock",
      render: (row: Ingredient) =>
        `${
          row.stockType === StockType.KILOGRAMS
            ? "gramme"
            : row.stockType === StockType.LITERS
            ? "litre"
            : "unité"
        }`,
      key: "stockType",
      className: "text-left px-4 border-y border-gray-200 py-2",
    },
    {
      title: "Modifier",
      render: () => (
        <div className="h-full w-full flex justify-end">
          <PencilIcon className="w-5 h-5 fill-gray-500 cursor-pointer" />
        </div>
      ),
      key: "createdAt",
      width: 50,
      onCell: (record) => ({
        onClick() {
          onClickHandler("edit", record as Ingredient)
        },
      }),
      className: "text-right px-4 border-y border-gray-200 py-2",
    },
    {
      title: "Supprimer",
      render: () => (
        <div className="h-full w-full flex justify-end">
          <TrashIcon className="w-5 h-5 fill-red-500 cursor-pointer" />
        </div>
      ),
      onCell: (record) => ({
        onClick() {
          onClickHandler("delete", record as Ingredient)
        },
      }),
      key: "updatedAt",
      width: 50,
      className: "px-4 border-r border-y border-gray-200 py-2",
    },
  ]

  const createIngredient = () => {
    setSelectedIngredient(undefined)
    toggle()
  }

  const onClickHandler = async (columnName: string, row: Ingredient) => {
    if (columnName === "delete") {
      const isConfirm = await showConfirmation({
        type: "danger",
        title: "Êtes-vous sûr de vouloir supprimer ?",
        message:
          "En supprimant cet ingrédient, vous supprimerez également toutes les recettes qui l'utilisent.",
      })
      if (!isConfirm) return

      // Delete ingredient if user confirm
      await deleteIngredient(row._id)
      refresh()
      // const newIngredients = ingredients.filter(
      //   (ingredient) => ingredient._id !== row._id,
      // )
      // setIngredients(newIngredients)

      addToast({
        title: "Suppression réussie",
        message: "L'ingrédient a bien été supprimé",
        type: "success",
      })
    } else if (columnName === "edit") {
      setSelectedIngredient(row)
      toggle()
    }
  }

  const handleChangement = (
    type: "create" | "edit",
    ingredient: Ingredient,
  ) => {
    // if (type === "create") {

    // } else if (type === "edit") {
    //   const newIngredients = ingredients.map((ing) => {
    //     if (ing._id === ingredient._id) {
    //       return ingredient
    //     }
    //     return ing
    //   })
    //   setIngredients(newIngredients)
    // }
    refresh()
    toggle()
  }

  return (
    <div className="flex flex-col items-center justify-center self-stretch w-full">
      <div className="max-w-7xl">
        {ingredients && ingredients.length > 0 && (
          <RCTable
            rowKey={(row) => row._id}
            columns={columns}
            data={ingredients}
            className=""
            rowClassName=""
          />
        )}
        <div className="w-full flex flex-row mt-4">
          <button
            className="bg-gray-900 text-white font-bold py-2 px-4 rounded"
            onClick={createIngredient}
          >
            Ajouter un ingrédient
          </button>
        </div>
      </div>
      <IngredientSlideOver
        isShowing={isShowing}
        toggle={toggle}
        ingredient={selectedIngredient}
        close={handleChangement}
      />
    </div>
  )
}

export default IngredientsManagement
