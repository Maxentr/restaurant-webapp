"use client"

import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import { useToast } from "hooks/contexts/useToast"
import { MenuForm, Menu } from "types/menu.type"
import { editMenu } from "services/menu.service"
import { useRouter } from "next/navigation"
import ManageMenu from "components/pages/admin/ManageMenu"
import { Drink } from "types/drink.type"
import { Dish } from "types/dish.type"

type Props = {
  menu: Menu
  dishes: Dish[]
  drinks: Drink[]
}
const EditMenu = ({ menu, dishes, drinks }: Props) => {
  const router = useRouter()
  const { addToast } = useToast()
  const [editedMenu, setEditedMenu] = useState<MenuForm>()

  const submitMenu = async () => {
    // Flemme de faire un vrai form
    if (!editedMenu) return
    const modifiedMenu = await editMenu(menu._id, editedMenu)

    if ("data" in modifiedMenu) {
      addToast({
        type: "success",
        title: "Succès",
        message: `Le menu a bien été modifié"`,
      })
      router.push("/admin/menus")
    }
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
          onClick={submitMenu}
          className="bg-gray-900 active:bg-black text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
        >
          <p>Modifier le menu</p>
        </button>
      </div>
      <h1 className="text-xl mt-4">Modifier le menu</h1>
      <ManageMenu
        menu={menu}
        dishes={dishes}
        drinks={drinks}
        onChange={setEditedMenu}
      />
    </div>
  )
}

export default EditMenu
