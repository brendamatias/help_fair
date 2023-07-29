import { useState } from 'react'
import ReactCurrencyInput from 'react-currency-input-field'

type CurrencyInputProps = {
  defaultValue: number
}

export const CurrencyInput = ({ defaultValue }: CurrencyInputProps) => {
  const [value, setValue] = useState<string | undefined>(
    (defaultValue / 100).toString(),
  )

  return (
    <ReactCurrencyInput
      className="font-semibold text-white bg-transparent text-xs sm:text-base text-right w-20"
      intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
      decimalSeparator=","
      groupSeparator="."
      value={value}
      onValueChange={(value) => setValue(value)}
    />
  )
}
