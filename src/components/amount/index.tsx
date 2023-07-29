import { formatPrice } from '../../utils/format'

type AmountProps = {
  total: number
  predictedValue: number
}

export const Amount = ({ total, predictedValue }: AmountProps) => {
  return (
    <div className="w-full fixed bottom-0 px-6 bg-slate-950">
      <div className="max-w-md m-auto py-8">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-white text-sm">Total:</span>
            <strong className="text-white text-md">{formatPrice(total)}</strong>
          </div>
          <div className="flex justify-between items-center border-t pt-3 border-gray-900">
            <span className="text-white text-sm">Previsto:</span>
            <strong className="text-white text-md">
              {formatPrice(predictedValue)}
            </strong>
          </div>
        </div>

        <div className="mt-8">
          <button className="bg-violet-600 text-sm text-white rounded-md p-5 w-full">
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  )
}
