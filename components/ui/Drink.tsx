import React from "react"
import useDrink from "../../hooks/services/useDrink"

export type DrinkProps = {
  drinkId: string
  sizeId?: string
}

const Drink = ({ drinkId, sizeId }: DrinkProps) => {
  const { drink, size } = useDrink(drinkId, sizeId)
  return (
    drink && (
      <div className="flex flex-col gap-2 w-full">
        <p className="list-item list-inside">
          {drink.name} {size && size.name}{" "}
        </p>
      </div>
    )
  )
}

export default Drink
