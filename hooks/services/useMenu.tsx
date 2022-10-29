import { useEffect, useState } from "react"
import { Menu } from "../../types/menu.type"
import { getMenu } from "../../services/menu.service"

const useMenu = (menuId: string) => {
  const [menu, setMenu] = useState<Menu | null>(null)

  useEffect(() => {
    const getAndSetMenu = async () => {
      const data = await getMenu(menuId)
      setMenu(data)
    }
    getAndSetMenu()
  }, [menuId])

  return { menu }
}

export default useMenu
