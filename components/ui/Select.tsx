import React, { ChangeEvent, useState } from "react"
import { GetTypeFromArray } from "types/common.type"
import WithLabel from "./WithLabel"

interface Props {
  name: string
  label?: string
  placeholder?: string
  noDataMessage?: string
  disabled?: boolean
  data: any[]
  defaultValue?: any
  accessor?: {
    value: string
    display: string
  }
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Select = ({
  label,
  name,
  data,
  defaultValue,
  placeholder,
  noDataMessage,
  accessor,
  disabled,
  onChange,
}: Props) => {
  const inputId = `input-select-${name}`
  const [selected, setSelected] = useState<GetTypeFromArray<Props["data"]>>(
    accessor ? defaultValue?.[accessor.value] : defaultValue || "",
  )

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
            <option key={JSON.stringify(item) + index} value={value}>
              {display}
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
