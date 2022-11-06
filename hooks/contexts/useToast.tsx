"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react"
import ToastList from "../../components/ui/ToastList"

export type ToastType = "success" | "info" | "warning" | "error"

export type CreateToast = {
  type: ToastType
  title: string
  message?: string
  duration?: number
}

export type Toast = {
  id: string
  show: boolean
  type: ToastType
  title: string
  message?: string
  duration?: number
  timeout: ReturnType<typeof setTimeout>
}

type ToastContextInterface = {
  // eslint-disable-next-line no-unused-vars
  addToast: ({ type, title, message, duration }: CreateToast) => void
  // eslint-disable-next-line no-unused-vars
  removeToast: (id: string) => void
  toasts: Toast[]
}

const ToastContext = createContext({} as ToastContextInterface)

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  // const addToast = ({ type, title, message, duration }: CreateToast) => {
  //   const id = Math.random().toString(36)

  //   setToasts([
  //     ...toasts,
  //     {
  //       id: id,
  //       type: type,
  //       title: title,
  //       message: message,
  //       timeout: setTimeout(() => {
  //         removeToast(id)
  //       }, duration || 3000),
  //     },
  //   ])
  // }

  // const removeToast = (id: string) => {
  //   setToasts((toasts) => toasts.filter((toast) => toast.id !== id))
  // }

  const addToast = useCallback(
    ({ type, title, message, duration }: CreateToast) => {
      const id = Math.random().toString(36)

      const newToast: Toast = {
        id: id,
        show: true,
        type: type,
        title: title,
        message: message,
        timeout: setTimeout(() => {
          removeToast(id)
        }, duration || 3000),
      }

      setToasts((existingToasts) => [...existingToasts, newToast])
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setToasts],
  )

  const removeToast = useCallback(
    (id: string) => {
      setToasts((existingToasts) => [
        ...existingToasts.map((toast) => {
          if (toast.id === id) {
            return { ...toast, show: false }
          }

          return toast
        }),
      ])

      setTimeout(() => {
        setToasts((existingToasts) => [
          ...existingToasts.filter((toast) => toast.id !== id),
        ])
      }, 1000)
    },
    [setToasts],
  )

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
      <ToastList />
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextInterface => useContext(ToastContext)
export default ToastProvider
