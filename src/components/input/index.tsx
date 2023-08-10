import { InputHTMLAttributes } from 'react'

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="rounded-md p-4 text-slate-900 placeholder:text-slate-400 w-full bg-slate-200"
      placeholder="Buscar uma feira"
      {...props}
    />
  )
}
