import React, {
  ChangeEvent,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from "react"
import WithLabel from "./WithLabel"

type Props = {
  type?: HTMLInputTypeAttribute
  name: string
  label?: string
  placeholder?: string
  defaultValue?: string | number
  value?: string | number
  disabled?: boolean
  max?: number
  min?: number
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
  type = "text",
  label,
  name,
  value,
  defaultValue,
  placeholder,
  disabled,
  min,
  max,
  onChange,
}: Props) => {
  const inputId = `input-${name}`
  const formattedDefaultValue =
    type === "number" ? +(defaultValue || min || 0) : defaultValue || ""

  const [inputValue, setValue] = useState(formattedDefaultValue)

  useEffect(() => {
    if (value) setValue(value)
  }, [value])

  const rawInput = (
    <input
      type={type}
      id={inputId}
      name={name}
      value={inputValue}
      placeholder={placeholder}
      disabled={disabled}
      className="border border-gray-900 rounded-md px-4 py-2"
      onChange={(e) => {
        setValue(e.target.value)
        onChange(e)
      }}
      min={min}
      max={max}
      minLength={min}
      maxLength={max}
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
