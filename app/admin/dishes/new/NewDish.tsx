"use client"

import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import { useState } from "react"
import { useToast } from "hooks/contexts/useToast"
import { DishForm } from "types/dish.type"
import { addDish } from "services/dish.service"
import { Ingredient } from "types/ingredient.type"
import { useRouter } from "next/navigation"
import ManageDish from "components/pages/admin/ManageDish"

type Props = {
  ingredients: Ingredient[]
}
const NewDish = ({ ingredients }: Props) => {
  const router = useRouter()
  const { addToast } = useToast()
  const [editedDish, setEditedDish] = useState<DishForm>()

  const submitDish = async () => {
    // Flemme de faire un vrai form
    if (!editedDish) return
    const modifiedDish = await addDish(editedDish)

    if ("data" in modifiedDish) {
      addToast({
        type: "success",
        title: "Succès",
        message: `Le plat a bien été ajouté"`,
      })
      router.push("/admin/dishes")
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
          onClick={submitDish}
          className="bg-gray-900 active:bg-black text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
        >
          <p>Créer le plat</p>
        </button>
      </div>
      <h1 className="text-xl mt-4">Modifier le plat</h1>
      <ManageDish ingredients={ingredients} onChange={setEditedDish} />
    </div>
  )
}

export default NewDish
