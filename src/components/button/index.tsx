import { ButtonHTMLAttributes } from 'react'

type ButtonProps = {
  children: any
  theme?: 'default' | 'outlined'
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  children,
  className = '',
  type = 'button',
  theme = 'default',
  ...props
}: ButtonProps) => {
  const classes =
    theme === 'default'
      ? 'text-white border-purple-600 bg-purple-600 hover:bg-purple-500 hover:border-purple-500'
      : 'text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white'

  return (
    <button
      type={type}
      className={`flex gap-3 items-center text-sm font-semibold py-3 px-6 rounded-md transition-all border-2 ${classes} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
