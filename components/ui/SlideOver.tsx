import { Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/solid"
import React, { ReactNode, useEffect, useState } from "react"
import { createPortal } from "react-dom"

export type SlideOverProps = {
  title: string
  toggle: () => void
  isShowing: boolean
  children: ReactNode
  footer?: ReactNode
}

const SlideOver = ({ title, toggle, isShowing, children, footer }: SlideOverProps) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const content = (
    <Transition show={isShowing}>
      <Transition.Child
        enter="transition-opacity duration-200 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as="div"
        className="fixed inset-0 overflow-hidden bg-black bg-opacity-10 z-40"
      />
      <Transition.Child
        enter="transition-all transform duration-200 ease-out"
        enterFrom="opacity-0 translate-x-1/4"
        enterTo="opacity-100 translate-x-0"
        leave="transition-all transform duration-200 ease-in"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-1/4"
        as="div"
        onClick={toggle}
        className="fixed inset-0 overflow-hidden z-50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed top-0 bottom-0 right-0 h-full w-[400px] bg-white shadow-md flex flex-col"
        >
          <div className="h-16 px-4 flex items-center justify-between bg-black">
            <p className="text-white font-medium text-lg">{title}</p>
            <XMarkIcon
              onClick={toggle}
              className="fill-white w-6 h-6 cursor-pointer"
            />
          </div>
          <div className="p-4 flex flex-grow flex-col overflow-y-auto">
            {children}
          </div>
          <div className="p-4 w-full">
            {footer}
          </div>
        </div>
      </Transition.Child>
    </Transition>
  )

  return isBrowser ? createPortal(content, document.body) : null
}

export default SlideOver
