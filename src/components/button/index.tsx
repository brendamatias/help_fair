type ButtonProps = {
  children: any
  theme?: 'default' | 'outlined'
}

export const Button = ({ children, theme = 'default' }: ButtonProps) => {
  const classes =
    theme === 'default'
      ? 'text-white border-violet-600 bg-violet-600 hover:bg-violet-500'
      : 'text-violet-500 border-violet-500 hover:bg-violet-500 hover:text-white'

  return (
    <button
      className={`flex gap-3 items-center text-sm font-semibold py-3 px-5 rounded-md transition-all border ${classes}`}
    >
      {children}
    </button>
  )
}
