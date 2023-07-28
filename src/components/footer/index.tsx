import { formatPrice } from '../../utils/format'

type FooterProps = {
  total: number
}

export const Footer = ({ total }: FooterProps) => {
  return (
    <div className="w-full fixed bottom-0 px-6 bg-slate-950">
      <div className="max-w-md m-auto py-8">
        <div className="flex justify-between items-center">
          <span className="text-white text-sm">Total:</span>
          <strong className="text-white text-md">{formatPrice(total)}</strong>
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
