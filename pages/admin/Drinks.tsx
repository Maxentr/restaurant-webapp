import { useEffect, useState } from "react"
import AdminLayout from "../../layouts/AdminLayout"
import { getDrinks } from "../../services/drink.service"
import { Drink } from "../../types/drink.type"

const Drinks = () => {
  const [drinks, setDrinks] = useState<Drink[]>([])

  useEffect(() => {
    const getAndSetDrinks = async () => {
      const response = await getDrinks()
      const formattedResponse = response.map((row) => {
        return {
          ...row,
          sizes: row.size.map((size) => size.name).join(", "),
        }
      })

      console.log(formattedResponse)

      setDrinks(formattedResponse)
    }
    getAndSetDrinks()
  }, [])

  // const onClickHandler = (columnName: string, row: Drink) => {
  //   if (columnName === "Supprimer") {
  //     console.log("Suppression de l'ingrédient", row)
  //   } else if (columnName === "Modifier") {
  //     console.log("Modification de l'ingrédient", row)
  //   }
  // }

  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center self-stretch w-full">
        {drinks.length > 0 && <div></div>}
      </div>
    </AdminLayout>
  )
}

export default Drinks
