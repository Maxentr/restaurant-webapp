/* eslint-disable no-unused-vars */
"use client"

import React, { useContext, useRef, useState } from "react"
import Modal, { ModalType } from "../../components/ui/Modal"
import useModal from "../useModal"

type ModalContent = {
  title: string
  message: string
  type?: ModalType
  isConfirmation?: boolean
  cancelBtnText?: string
  confirmBtnTxt?: string
}

type ModalContextType = {
  showConfirmation: ({
    title,
    message,
    type,
    isConfirmation,
    cancelBtnText,
    confirmBtnTxt,
  }: ModalContent) => Promise<boolean>
}

type ConfirmationModalProviderProps = {
  children: React.ReactNode
}

const ConfirmationModalContext = React.createContext<ModalContextType>(
  {} as ModalContextType,
)

const ConfirmationModalProvider = (props: ConfirmationModalProviderProps) => {
  const { isShowing, toggle } = useModal()

  const [content, setContent] = useState<ModalContent>({
    title: "",
    message: "",
  })
  const resolver = useRef<Function>()

  const handleShow = (props: ModalContent): Promise<boolean> => {
    setContent(props)
    toggle()
    return new Promise(function (resolve) {
      resolver.current = resolve
    })
  }

  const modalContext: ModalContextType = {
    showConfirmation: handleShow,
  }

  const handleOk = () => {
    resolver.current && resolver.current(true)
    toggle()
  }

  const handleCancel = () => {
    resolver.current && resolver.current(false)
    toggle()
  }

  return (
    <ConfirmationModalContext.Provider value={modalContext}>
      {props.children}

      <Modal
        isShowing={isShowing}
        toggle={toggle}
        title={content.title}
        message={content.message}
        type={content.type}
        cancelBtnText="Annuler"
        confirmBtnTxt="Supprimer"
        onCancel={handleCancel}
        onConfirm={handleOk}
        isConfirmation={content.isConfirmation}
      />
    </ConfirmationModalContext.Provider>
  )
}

export const useConfirmationModal = (): ModalContextType =>
  useContext(ConfirmationModalContext)
export default ConfirmationModalProvider
