import React, { ChangeEvent, HTMLInputTypeAttribute } from "react"
import WithLabel from "./WithLabel"

type Props = {
  type?: HTMLInputTypeAttribute
  name: string
  label?: string
  placeholder?: string
  defaultValue?: string | number
  disabled?: boolean
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
  type = "text",
  label,
  name,
  defaultValue,
  placeholder,
  disabled,
  onChange,
}: Props) => {
  const inputId = `input-${name}`

  const formattedDefaultValue =
    type === "number" ? +(defaultValue || 0) : defaultValue || ""

  const rawInput = (
    <input
      type={type}
      id={inputId}
      name={name}
      defaultValue={formattedDefaultValue}
      placeholder={placeholder}
      disabled={disabled}
      className="border border-gray-900 rounded-md px-4 py-2"
      onChange={onChange}
    />
  )

  return label ? (
    <WithLabel inputId={inputId} label={label}>
      {rawInput}
    </WithLabel>
  ) : (
    rawInput
  )
}

export default Input
