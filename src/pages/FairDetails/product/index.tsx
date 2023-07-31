import { useState } from 'react'
import { IoAdd, IoRemove, IoSave, IoClose } from 'react-icons/io5'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { formatPrice } from '@/utils/format'
import { CurrencyInput } from '@/components'
import { FairProduct } from '@/types'
import FairProductService from '@/services/fairProduct.service'

type ProductProps = {
  fairId: string
  product: FairProduct
  handleCheck: (_id: string, bought: boolean) => void
  onSubmit: () => void
}

export const Product = ({
  fairId,
  product,
  onSubmit,
  handleCheck,
}: ProductProps) => {
  const [edit, setEdit] = useState(false)
  const [qty, setQty] = useState(product.qty)
  const [price, setPrice] = useState<string | undefined>(
    (product.price / 100).toString(),
  )

  const priceFormatted = () => {
    let priceFormatted = 0

    if (price) {
      priceFormatted = parseInt(price.replace(/,|\./g, ''), 10)
    }

    return priceFormatted
  }

  const cancelEdit = () => {
    setQty(product.qty)
    setPrice((product.price / 100).toString())
    setEdit(false)
  }

  const handleSubmit = async () => {
    try {
      await FairProductService.updateFairProduct(fairId, product._id, {
        price: priceFormatted(),
        qty,
      })

      onSubmit()
      setEdit(false)
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message ||
          'Ocorreu um erro, tente novamente',
      )
    }
  }

  return (
    <li className="py-4">
      <div className="flex items-center justify-end gap-4 mb-2">
        {!edit ? (
          <>
            <button
              onClick={() => setEdit(true)}
              className="flex items-center text-sm gap-2 border rounded-sm border-gray-900 hover:border-green-500 px-3 py-1 text-gray-400 transition-all hover:text-green-500"
            >
              Editar
              <FiEdit size={16} />
            </button>
            <button className="flex items-center text-sm gap-2 border rounded-sm border-gray-900 hover:border-green-500 px-3 py-1 text-gray-400 transition-all hover:text-green-500">
              Remover
              <FiTrash size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSubmit}
              className="flex items-center text-sm gap-2 border rounded-sm border-gray-900 hover:border-green-500 px-3 py-1 text-gray-400 transition-all hover:text-green-500"
            >
              Salvar
              <IoSave size={14} />
            </button>
            <button
              onClick={cancelEdit}
              className="flex items-center text-sm gap-2 border rounded-sm border-gray-900 hover:border-green-500 px-3 py-1 text-gray-400 transition-all hover:text-green-500"
            >
              Cancelar
              <IoClose size={16} />
            </button>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button onClick={() => handleCheck(product._id, !product.bought)}>
          <svg
            className={`w-3.5 h-3.5 mr-2 flex-shrink-0 transition-all ${
              product.bought ? 'text-green-400' : 'text-gray-400'
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
        </button>

        <div className="flex-1 min-w-0">
          <strong className="font-medium text-white text-sm">
            {product.name}
          </strong>

          <div className="flex gap-2 items-center">
            <button
              className="font-medium text-gray-400 disabled:text-gray-700"
              disabled={!edit || qty === 0}
              onClick={() => setQty(qty - 1)}
            >
              <IoRemove size={18} />
            </button>
            <span
              className={`text-md ${edit ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {qty}
            </span>
            <button
              className="font-medium text-gray-400 disabled:text-gray-700"
              onClick={() => setQty(qty + 1)}
              disabled={!edit}
            >
              <IoAdd size={18} />
            </button>
            <span className="text-sm text-gray-400">
              unidade{qty > 1 && 's'}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <CurrencyInput value={price} setValue={setPrice} edit={edit} />
          <span className="text-gray-500 text-xs">
            Total: {formatPrice((priceFormatted() / 100) * qty)}
          </span>
        </div>
      </div>
    </li>
  )
}
