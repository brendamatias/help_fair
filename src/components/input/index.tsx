import { useEffect, useRef, useState } from 'react'
import CurrencyInput from 'react-currency-input-field'

type InputProps = {
  defaultValue: number
}

export const Input = ({ defaultValue }: InputProps) => {
  const [value, setValue] = useState<string | undefined>(
    (defaultValue / 100).toString(),
  )
  const [width, setWidth] = useState(0)
  const span = useRef()

  useEffect(() => {
    setWidth(span.current.offsetWidth)
  }, [value])

  return (
    <div>
      <span className="invisible absolute" ref={span} style={{ maxWidth: 200 }}>
        R$ {value}
      </span>
      <CurrencyInput
        className="font-semibold text-white bg-transparent"
        style={{ width: width + 1, maxWidth: 200 }}
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
        decimalSeparator=","
        groupSeparator="."
        value={value}
        onValueChange={(value) => setValue(value)}
      />
    </div>
  )
}
