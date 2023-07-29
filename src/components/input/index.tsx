import { useState } from 'react'
import CurrencyInput from 'react-currency-input-field'

type InputProps = {
  defaultValue: number
}

export const Input = ({ defaultValue }: InputProps) => {
  const [value, setValue] = useState<string | undefined>(
    (defaultValue / 100).toString(),
  )

  return (
    <div>
      <CurrencyInput
        className="font-semibold text-white bg-transparent text-xs sm:text-base text-right w-20"
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
        decimalSeparator=","
        groupSeparator="."
        value={value}
        onValueChange={(value) => setValue(value)}
      />
    </div>
  )
}
