import Image from "next/image"
import React from "react"

export type CardType = {
  id: string
  title: string
  description: string
  price?: number
  image?: string
  imageOptions?: {
    contain?: boolean
  }
}

export type CardProps = CardType & {
  buttonLabel: string
  // eslint-disable-next-line no-unused-vars
  onButtonClick: (id: string) => void
  // eslint-disable-next-line no-unused-vars
  onCardClick?: (id: string) => void
}

const Card = ({
  id,
  title,
  description,
  price,
  image,
  imageOptions,
  onCardClick,
  onButtonClick,
  buttonLabel,
}: CardProps) => {
  return (
    <div
      onClick={() => onCardClick && onCardClick(id)}
      className={
        "w-fit h-[192px] bg-white p-4 rounded-xl text-gray-900 shadow-md flex flex-row gap-4 " +
        (onCardClick && "cursor-pointer")
      }
    >
      {image && (
        <div className="relative w-48">
          <Image
            src={image}
            alt={title}
            fill
            className={
              "h-screen w-fit rounded-md" +
              (imageOptions?.contain ? " object-contain" : " object-cover")
            }
            sizes="100%"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 justify-between w-64">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-lg">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
        <div
          className={
            "w-full flex items-center " +
            (price ? "justify-between" : "justify-end")
          }
        >
          {price && <p className="font-medium">{price}€</p>}
          <button
            onClick={(e) => {
              e.stopPropagation(), onButtonClick(id)
            }}
            className="bg-gray-900 active:bg-black text-white px-4 py-2 rounded"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
