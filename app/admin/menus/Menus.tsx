"use client"

import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid"
import { ColumnsType, DefaultRecordType } from "rc-table/lib/interface"
import React from "react"
import { useRouter } from "next/navigation"

import { Dish } from "types/dish.type"
import { Menu } from "types/menu.type"
import { Drink } from "types/drink.type"
import Table from "components/ui/Table"

type Props = {
  menus: Menu[]
  dishes: Dish[]
  drinks: Drink[]
}

const MenusManagement = ({ menus, dishes, drinks }: Props) => {
  const router = useRouter()

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
      dataIndex: "price",
      key: "price",
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
          console.log("delete")
          // handleDeletion(record as Menu)
        },
      }),
      key: "updatedAt",
      width: 50,
      className: "px-4 border-r border-y border-gray-200 py-2",
    },
  ]

  return (
    <>
      <div className="flex flex-col items-center justify-center self-stretch w-full">
        <div className="max-w-7xl">
          <Table columns={columns} data={menus} rowKey="_id" />
          <div className="w-full flex flex-row mt-4">
            <button
              className="bg-gray-900 text-white font-bold py-2 px-4 rounded"
              onClick={
                () =>
                  console.log("add a menu") /*router.push("/admin/menus/new")*/
              }
            >
              Ajouter un menu
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MenusManagement
