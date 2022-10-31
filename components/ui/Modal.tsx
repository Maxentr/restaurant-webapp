import { Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/20/solid"
import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"

type ModalProps = {
  isShowing: boolean
  toggle: () => void
  title: string
  message: string
  cancelBtnText?: string
  confirmBtnTxt?: string
  isConfirmation?: boolean
  onCancel?: () => void
  onConfirm?: () => void
}

const Modal = ({
  isShowing,
  toggle,
  title,
  message,
  cancelBtnText = "Annuler",
  confirmBtnTxt = "Confirmer",
  isConfirmation = true,
  onCancel,
  onConfirm,
}: ModalProps) => {
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
        className="fixed inset-0 overflow-hidden z-50 flex justify-center items-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[420px] h-fit bg-white rounded-lg shadow-md"
        >
          <div className="p-4 flex items-center justify-between">
            <p className="text-gray-900 font-medium text-lg">{title}</p>
            <XMarkIcon
              onClick={toggle}
              className="fill-gray-900 w-6 h-6 cursor-pointer"
            />
          </div>
          <div className="px-4 flex flex-grow flex-col overflow-y-auto">
            {message}
          </div>
          <div className="p-4 w-full flex flex-row gap-2 justify-end">
            <button
              onClick={onCancel}
              className="bg-white text-gray-900 rounded-md py-2 px-4"
            >
              {cancelBtnText}
            </button>
            {isConfirmation && (
              <button
                onClick={onConfirm}
                className="bg-red-600 text-white rounded-md py-2 px-4"
              >
                {confirmBtnTxt}
              </button>
            )}
          </div>
        </div>
      </Transition.Child>
    </Transition>
  )

  return isBrowser ? createPortal(content, document.body) : null
}

export default Modal
