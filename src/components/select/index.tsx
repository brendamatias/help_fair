import { SelectHTMLAttributes } from 'react'

type SelectProps = {
  options: {
    _id: string
    name: string
  }[]
} & SelectHTMLAttributes<HTMLSelectElement>

export const Select = ({ options = [], ...props }: SelectProps) => {
  return (
    <select
      className="rounded-md p-4 text-slate-900 placeholder:text-slate-400 w-full bg-slate-200 font-medium disabled:opacity-40"
      {...props}
    >
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </select>
  )
}
