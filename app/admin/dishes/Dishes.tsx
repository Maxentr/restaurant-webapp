"use client"

import {
  MinusIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid"
import { ColumnsType, DefaultRecordType } from "rc-table/lib/interface"
import React, { useState } from "react"
import RCTable from "rc-table"
import { useConfirmationModal } from "hooks/contexts/useConfirmationModal"
import { useToast } from "hooks/contexts/useToast"
import { Dish, DishIngredient } from "types/dish.type"
import { deleteDish } from "services/dish.service"
import { Ingredient } from "types/ingredient.type"
import { useRouter } from "next/navigation"

type Props = {
  dishesResponse: Dish[]
  ingredients: Ingredient[]
}
const Dishes = ({ dishesResponse }: Props) => {
  const router = useRouter()
  const { addToast } = useToast()
  const { showConfirmation } = useConfirmationModal()

  const [dishes, setDishes] = useState<Dish[]>(dishesResponse)

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
      title: "Quantité en stock",
      render: (row: Dish) => `${row.price}€`,
      key: "price",
      className: "text-right px-4 border-y border-gray-200 py-2",
    },
    {
      title: "Catégories",
      dataIndex: "category",
      key: "category",
      className: "text-right px-4 border-y border-gray-200 py-2",
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
          router.push(`/admin/dishes/${(record as Dish)._id}`)
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
          handleDeletion(record as Dish)
        },
      }),
      key: "updatedAt",
      width: 50,
      className: "px-4 border-r border-y border-gray-200 py-2",
    },
  ]

  const expandColumns: ColumnsType<DefaultRecordType> = [
    {
      title: "Nom de l'ingrédient",
      render: (row: DishIngredient) =>
        `${typeof row.ingredient === "object" ? row?.ingredient?.name : ""}`,
      key: "id",
      className: "w-full text-left px-4 py-2",
    },
    {
      title: "Quantité",
      dataIndex: "quantity",
      key: "quantity",
      className: "w-full text-right px-4 py-2",
    },
  ]

  const handleDeletion = async (dish: Dish) => {
    const isConfirm = await showConfirmation({
      type: "danger",
      title: "Êtes-vous sûr de vouloir supprimer ?",
      message:
        "En supprimant ce plat, vous supprimerez également toutes les menus qui la contiennent.",
    })
    if (!isConfirm) return

    await deleteDish(dish._id)
    const newDishes = dishes.filter((oldDish) => oldDish._id !== dish._id)
    setDishes(newDishes)

    addToast({
      title: "Suppression réussie",
      message: "Le plat a bien été supprimé",
      type: "success",
    })
  }

  const CustomExpandIcon = (props: any) => {
    return (
      <div
        onClick={(e) => {
          props.onExpand(props.record, e)
        }}
        className="expand-row-icon w-full h-full cursor-pointer"
      >
        {props.expanded ? (
          <MinusIcon className="fill-gray-900 w-4" />
        ) : (
          <PlusIcon className="fill-gray-900 w-4" />
        )}
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center self-stretch w-full">
        <div className="max-w-7xl">
          {dishes.length > 0 && (
            <RCTable
              rowKey={(row) => row._id}
              columns={columns}
              expandable={{
                showExpandColumn: true,
                indentSize: 0,
                expandRowByClick: false,
                expandedRowClassName: () => "border border-gray-200",
                expandedRowRender: (row) => (
                  <RCTable
                    rowKey={(row) => row._id}
                    columns={expandColumns}
                    data={row.ingredients}
                    className="w-full"
                    rowClassName="w-full border-t border-gray-200"
                  />
                ),
                expandIcon: CustomExpandIcon,
              }}
              data={dishes}
              className=""
              rowClassName="border border-gray-200"
            />
          )}
          <div className="w-full flex flex-row mt-4">
            <button
              className="bg-gray-900 text-white font-bold py-2 px-4 rounded"
              onClick={() => router.push("/admin/dishes/new")}
            >
              Ajouter un plat
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dishes
