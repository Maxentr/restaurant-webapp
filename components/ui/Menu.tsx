import React from "react"
import useMenu from "../../hooks/services/useMenu"

type MenuProps = {
  menuId: string
}

const Menu = ({ menuId }: MenuProps) => {
  const { menu } = useMenu(menuId)
  return (
    <>
      {menu && (
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-medium">{menu.name}</h1>
          <p className="text-sm">{menu.description}</p>
        </div>
      )}
    </>
  )
}

export default Menu
