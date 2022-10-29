import { Transition } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/20/solid"
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { ToastType, useToast } from "../../hooks/contexts/useToast"

const ToastList = () => {
  const { toasts, removeToast } = useToast()
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const icons: Record<ToastType, () => JSX.Element> = {
    info: () => <InformationCircleIcon className="h-6 w-6 text-blue-400" />,
    success: () => <CheckCircleIcon className="h-5 w-5 text-green-400" />,
    warning: () => (
      <ExclamationTriangleIcon className="h-5 w-5 text-amber-500" />
    ),
    error: () => <ExclamationCircleIcon className="h-6 w-6 text-red-400" />,
  }

  const content = (
    <div className="fixed top-4 right-4 z-[100]">
      <div className="flex flex-col gap-4">
        {toasts.map(({ id, show, type, title, message }) => (
          <Transition
            show={show}
            appear={true}
            unmount={true}
            enter="transition-all transform duration-300 ease-out"
            enterFrom="opacity-0 scale-90 translate-y-10"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="transition-all duration-300 ease-in"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-90 -translate-y-10"
            as="div"
            key={id}
            className="bg-white min-w-[256px] rounded-md shadow-md border border-gray-100 px-4 py-3 flex flex-row justify-between gap-2"
          >
            <div className="h-6 flex items-center">{icons[type]()}</div>
            <div className="flex flex-grow flex-col gap-1">
              <div className="flex flex-row items-center justify-between gap-4">
                <p className="font-medium text-gray-700">{title}</p>
                <XMarkIcon
                  onClick={() => removeToast(id)}
                  className="h-4 w-4 fill-gray-700 cursor-pointer"
                />
              </div>
              <p className="text-sm">{message}</p>
            </div>
          </Transition>
        ))}
      </div>
    </div>
  )

  return isBrowser ? createPortal(content, document.body) : null
}

export default ToastList
