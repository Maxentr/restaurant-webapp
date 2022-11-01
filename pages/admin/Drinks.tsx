import { useEffect, useState } from "react"
import AdminLayout from "../../layouts/AdminLayout"
import { Drink, DrinkStockSize } from "../../types/drink.type"
import { deleteDrink, getDrinks } from "../../services/drink.service"
import RCTable from "rc-table"
import {
  MinusIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid"
import { ColumnsType, DefaultRecordType } from "rc-table/lib/interface"
import { useToast } from "../../hooks/contexts/useToast"
import DrinkSlideOver from "../../components/pages/admin/DrinkSlideOver"
import useModal from "../../hooks/useModal"
import { useConfirmationModal } from "../../hooks/contexts/useConfirmationModal"

const DrinksManagement = () => {
  const { addToast } = useToast()
  const { isShowing, toggle } = useModal()
  const { showConfirmation } = useConfirmationModal()

  const [drinks, setDrinks] = useState<Drink[]>([])
  const [selectedDrink, setSelectedDrink] = useState<Drink>()

  useEffect(() => {
    const getAndSetDrinks = async () => {
      const response = await getDrinks()
      setDrinks(response)
    }
    getAndSetDrinks()
  }, [])

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
      render: (row: Drink) => `${row.stockLeft}L (litres)`,
      key: "stockLeft",
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
          handleEdition(record as Drink)
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
          handleDeletion(record as Drink)
        },
      }),
      key: "updatedAt",
      width: 50,
      className: "px-4 border-r border-y border-gray-200 py-2",
    },
  ]

  const expandColumns: ColumnsType<DefaultRecordType> = [
    {
      title: "Nom de la taille",
      dataIndex: "name",
      key: "name",
      className: "w-2/3 text-left px-4 py-2",
    },
    {
      title: "Prix",
      render: (size: DrinkStockSize) => `${size.price} €`,
      key: "price",
      className: "w-2/3 text-right px-4 py-2",
    },
    {
      title: "Quantité",
      dataIndex: "quantity",
      key: "quantity",
      className: "w-2/3 text-right px-4 py-2",
    },
  ]

  const createDrink = () => {
    setSelectedDrink(undefined)
    toggle()
  }

  const handleDeletion = async (drink: Drink) => {
    const isConfirm = await showConfirmation({
      type: "danger",
      title: "Êtes-vous sûr de vouloir supprimer ?",
      message:
        "En supprimant cette boisson, vous supprimerez également toutes les menus qui la contiennent.",
    })
    if (!isConfirm) return

    await deleteDrink(drink._id)
    const newDrinks = drinks.filter((drink) => drink._id !== drink._id)
    setDrinks(newDrinks)

    addToast({
      title: "Suppression réussie",
      message: "La boisson a bien été supprimée",
      type: "success",
    })
  }

  const handleEdition = (drink: Drink) => {
    setSelectedDrink(drink)
    toggle()
  }

  const handleSlideOverSubmit = (type: "create" | "edit", drink: Drink) => {
    if (type === "create") setDrinks([...drinks, drink])
    else if (type === "edit") {
      const newDrinks = drinks.map((ing) => {
        if (ing._id === drink._id) return drink
        return ing
      })
      setDrinks(newDrinks)
    }
    toggle()
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
    <AdminLayout>
      <div className="flex flex-col items-center justify-center self-stretch w-full mt-8 mb-12">
        <div className="max-w-7xl">
          {drinks.length > 0 && (
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
                    data={row.size}
                    className="w-full"
                    rowClassName="w-full border-t border-gray-200"
                  />
                ),
                expandIcon: CustomExpandIcon,
              }}
              data={drinks}
              className=""
              rowClassName="border border-gray-200"
            />
          )}
          <div className="w-full flex flex-row mt-4">
            <button
              className="bg-gray-900 text-white font-bold py-2 px-4 rounded"
              onClick={createDrink}
            >
              Ajouter une nouvelle boisson
            </button>
          </div>
        </div>
        <DrinkSlideOver
          isShowing={isShowing}
          toggle={toggle}
          drink={selectedDrink}
          close={handleSlideOverSubmit}
        />
      </div>
    </AdminLayout>
  )
}

export default DrinksManagement
