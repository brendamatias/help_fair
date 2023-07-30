import { useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { IoCheckmarkSharp, IoClose } from 'react-icons/io5'
import ReactCurrencyInput from 'react-currency-input-field'

type CurrencyInputProps = {
  defaultValue: number
}

export const CurrencyInput = ({ defaultValue }: CurrencyInputProps) => {
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState<string | undefined>(
    (defaultValue / 100).toString(),
  )

  return (
    <div className="flex items-center gap-2">
      <ReactCurrencyInput
        className={`font-semibold text-white bg-transparent text-xs sm:text-base text-right w-20 border rounded-md py-0.5 px-1 ${
          edit ? 'border-gray-500' : 'border-transparent'
        }`}
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
        decimalSeparator=","
        groupSeparator="."
        value={value}
        onValueChange={(value) => setValue(value)}
        disabled={!edit}
      />
      {!edit ? (
        <button onClick={() => setEdit(true)}>
          <FiEdit
            className="text-gray-300 transition-all hover:text-green-500"
            size={14}
          />
        </button>
      ) : (
        <>
          <button onClick={() => setEdit(!edit)}>
            <IoCheckmarkSharp
              className="text-gray-300 transition-all hover:text-green-500"
              size={14}
            />
          </button>
          <button onClick={() => setEdit(!edit)}>
            <IoClose
              className="text-gray-300 transition-all hover:text-green-500"
              size={14}
            />
          </button>
        </>
      )}
    </div>
  )
}
