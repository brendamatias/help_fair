import { useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { IoCheckmarkSharp, IoClose } from 'react-icons/io5'
import ReactCurrencyInput from 'react-currency-input-field'

type CurrencyInputProps = {
  defaultValue: number
  updatePrice: (price: number) => void
}

export const CurrencyInput = ({
  defaultValue,
  updatePrice,
}: CurrencyInputProps) => {
  const [edit, setEdit] = useState(false)
  const defaultValueFormatted = (defaultValue / 100).toString()
  const [value, setValue] = useState<string | undefined>(defaultValueFormatted)

  const onSubmit = async () => {
    if (value && value !== defaultValueFormatted) {
      const formatted = value.replace(/,|\./g, '')

      updatePrice(parseInt(formatted, 10))
    }

    setEdit(false)
  }

  const cancelEdit = () => {
    setEdit(false)
  }

  useEffect(() => {
    setValue(defaultValueFormatted)
  }, [defaultValueFormatted])

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
          <button onClick={onSubmit}>
            <IoCheckmarkSharp
              className="text-gray-300 transition-all hover:text-green-500"
              size={14}
            />
          </button>
          <button onClick={cancelEdit}>
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
