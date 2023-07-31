import { Dispatch, SetStateAction } from 'react'
import ReactCurrencyInput from 'react-currency-input-field'

type CurrencyInputProps = {
  edit: boolean
  value: string | undefined
  setValue: Dispatch<SetStateAction<string | undefined>>
}

export const CurrencyInput = ({
  edit,
  value,
  setValue,
}: CurrencyInputProps) => {
  return (
    <div className="flex items-center gap-2">
      <ReactCurrencyInput
        className={`font-semibold text-white bg-transparent text-base text-right w-20 border rounded-md py-0.5 px-1 ${
          edit ? 'border-gray-500' : 'border-transparent'
        }`}
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
        decimalSeparator=","
        groupSeparator="."
        value={value}
        onValueChange={(value) => setValue(value)}
        disabled={!edit}
      />
    </div>
  )
}
