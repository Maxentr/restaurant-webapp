import { getDrinks } from "../../../services/drink.service"
import DrinksManagement from "./Drinks"

const Page = async () => {
  const response = await getDrinks()
  if ("data" in response)
    return <DrinksManagement drinksReponse={response.data} />
}

export default Page
