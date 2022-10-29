import React from "react"

type RadioProps = {
  // eslint-disable-next-line no-unused-vars
  onSelected: (values: any[]) => void
  returnValueOnSelected: any[]
  disabled?: boolean
  label: string
  name: string
  id: string
}

const Radio = ({
  onSelected,
  disabled,
  label,
  name,
  id,
  returnValueOnSelected,
}: RadioProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked
    if (newValue) {
      onSelected(returnValueOnSelected)
    }
  }

  return (
    <div className="flex items-center">
      <input
        onChange={handleChange}
        id={id}
        type="radio"
        name={name}
        disabled={disabled}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
      />
      <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900">
        {label}
      </label>
    </div>
  )
}

export default Radio
