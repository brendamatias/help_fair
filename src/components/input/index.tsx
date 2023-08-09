import { InputHTMLAttributes } from 'react'

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="rounded-md p-4 text-white placeholder:text-gray-500 w-full"
      style={{ background: '#121214' }}
      placeholder="Buscar uma feira"
      {...props}
    />
  )
}
