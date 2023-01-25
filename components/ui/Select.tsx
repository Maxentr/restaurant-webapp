import React, { ChangeEvent, useEffect, useState } from "react"
import WithLabel from "./WithLabel"

type Props<T> = {
  name: string
  label?: string
  placeholder?: string
  noDataMessage?: string
  disabled?: boolean
  data: T[]
  value?: string | number
  defaultValue?: string | number
  accessor?: {
    value: keyof T
    display: keyof T
  }
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Select = <T,>({
  label,
  name,
  data,
  value,
  defaultValue,
  placeholder,
  noDataMessage,
  accessor,
  disabled,
  onChange,
}: Props<T>) => {
  const inputId = `input-select-${name}`
  const [selected, setSelected] = useState<string | number>(defaultValue || "")
  useEffect(() => {
    if (value) setSelected(value)
  }, [value])

  const rawSelect = (
    <select
      name={name}
      id={inputId}
      className="border border-gray-900 rounded-md px-4 py-2 bg-white h-[2.625rem]"
      disabled={disabled}
      value={selected}
      onChange={(e) => {
        setSelected(e.target.value)
        onChange(e)
      }}
    >
      {placeholder && (
        <option value="" disabled selected hidden>
          {placeholder}
        </option>
      )}
      {data.length > 0 ? (
        data.map((item, index) => {
          const value = accessor ? item[accessor.value] : item
          const display = accessor ? item[accessor.display] : item
          return (
            <option
              key={JSON.stringify(item) + index}
              value={value as string | number}
            >
              {display as string | number}
            </option>
          )
        })
      ) : (
        <option value="" disabled selected hidden>
          {noDataMessage}
        </option>
      )}
    </select>
  )

  return label ? (
    <WithLabel inputId={inputId} label={label}>
      {rawSelect}
    </WithLabel>
  ) : (
    rawSelect
  )
}

export default Select
