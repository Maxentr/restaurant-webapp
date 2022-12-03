import React, { ReactNode } from "react"

type WithLabelProps = {
  label: string
  inputId: string
  children: ReactNode
}
const WithLabel = ({ inputId, label, children }: WithLabelProps) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={inputId}>{label}</label>
    {children}
  </div>
)

export default WithLabel
