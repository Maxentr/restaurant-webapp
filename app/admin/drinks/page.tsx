import { getDrinks } from "../../../services/drink.service"
import DrinksManagement from "./drinks"

const Page = async () => {
  const drinks = await getDrinks()

  return <DrinksManagement drinksReponse={drinks} />
}

export default Page
