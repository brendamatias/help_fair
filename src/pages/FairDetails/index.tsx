import { useEffect, useState } from 'react'
import { IoChevronBack, IoAdd, IoSearch, IoClose } from 'react-icons/io5'
import { Amount, CreatableSelect } from '@/components'
import { Link, useParams } from 'react-router-dom'
import { Fair, FairProduct } from '@/types'
import FairService from '@/services/fair.service'
import FairProductService from '@/services/fairProduct.service'
import ProductService from '@/services/product.service'
import { toast } from 'react-toastify'
import { Product } from './product'

export const FairDetails: React.FC = () => {
  const { id = '' } = useParams()

  const [fair, setFair] = useState<Fair>()
  const [items, setItems] = useState<FairProduct[]>([])
  const [filteredItems, setFilteredItems] = useState<FairProduct[]>([])
  const [options, setOptions] = useState<{ value: string; label: string }[]>([])

  const [search, setSearch] = useState(false)
  const [filter, setFilter] = useState('')

  const orderByChecked = (fairProducts: FairProduct[]) => {
    const checkedList = fairProducts.filter((item) => item.bought)
    const notCheckedList = fairProducts.filter((item) => !item.bought)
    const ordered = [...notCheckedList, ...checkedList]

    return ordered
  }

  const filterBySearch = (query: string) => {
    setFilter(query)

    if (!query) return setFilteredItems(items)

    const filtered = items.filter(
      (item) => item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1,
    )

    setFilteredItems(orderByChecked(filtered))
  }

  const handleCheck = async (productId: string, bought: boolean) => {
    try {
      await FairProductService.updateFairProduct(id, productId, {
        bought,
      })

      await getFairProductList()
      setFilter('')
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message ||
          'Ocorreu um erro, tente novamente',
      )
    }
  }

  const getTotal = (checked = false) => {
    return items.reduce((total, { price, qty, bought: checkedValue }) => {
      const sum = total + price * qty

      if (checked) {
        return checkedValue ? sum : total
      }

      return sum
    }, 0)
  }

  const getFairList = async () => {
    try {
      const { data } = await FairService.getFair(id)

      setFair(data)
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message ||
          'Ocorreu um erro, tente novamente',
      )
    }
  }

  const getFairProductList = async () => {
    try {
      const { data } = await FairProductService.getFairProductList(id)

      setItems(data)
      setFilteredItems(data)
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message ||
          'Ocorreu um erro, tente novamente',
      )
    }
  }

  const getProductList = async () => {
    try {
      const { data } = await ProductService.getProductList()
      const optionsFormatted = data.map(({ name }) => {
        return { value: name, label: name }
      })

      setOptions(optionsFormatted)
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message ||
          'Ocorreu um erro, tente novamente',
      )
    }
  }

  const createProduct = async (value: string, newValue?: boolean) => {
    if (!value) return

    try {
      await FairProductService.createFairProduct(id, {
        name: value,
      })

      getFairProductList()

      if (newValue) {
        setOptions([...options, { value, label: value }])
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message ||
          'Ocorreu um erro, tente novamente',
      )
    }
  }

  const onUpdateProduct = async () => {
    try {
      await getFairProductList()
      setFilter('')
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message ||
          'Ocorreu um erro, tente novamente',
      )
    }
  }

  useEffect(() => {
    setFilteredItems(items)
  }, [search])

  useEffect(() => {
    getFairList()
    getFairProductList()
    getProductList()
  }, [])

  useEffect(() => {
    if (filter === '') {
      setFilteredItems(items)
    }
  }, [filter])

  return (
    <>
      <div className="py-8 max-w-md mx-auto px-6 sm:px-0">
        <header className="flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2">
            <Link to="/">
              <IoChevronBack className="text-white" size={16} />
            </Link>
            <h1 className="text-white text-2xl font-medium">{fair?.name}</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setSearch(true)}>
              <IoSearch
                className={`transition-all hover:text-green-500 ${
                  search ? 'text-green-500' : 'text-white'
                }`}
                size={24}
              />
            </button>
            <button onClick={() => setSearch(false)}>
              <IoAdd
                className={`transition-all hover:text-green-500 ${
                  !search ? 'text-green-500' : 'text-white'
                }`}
                size={30}
              />
            </button>
          </div>
        </header>

        {search ? (
          <div className="text-sm h-12 px-6 rounded-md w-full mb-6 bg-gray-700 flex items-center">
            <input
              value={filter}
              onChange={(e) => filterBySearch(e.target.value)}
              placeholder="Digite o nome do item"
              className="w-full bg-transparent text-white"
            />
            <button onClick={() => setFilter('')}>
              <IoClose className="text-gray-400" size={20} />
            </button>
          </div>
        ) : (
          <div className="max-w-md flex mx-auto mb-6">
            <CreatableSelect options={options} onCreate={createProduct} />
          </div>
        )}

        <ul
          className="max-w-md divide-y divide-gray-700 overflow-y-auto"
          style={{
            height: 'calc(100vh - 229px - 48px - 55px - 32px - 25px)',
            marginRight: '-6px',
            paddingRight: 6,
          }}
        >
          {filteredItems.map((item) => (
            <Product
              key={item._id}
              fairId={id}
              product={item}
              onSubmit={onUpdateProduct}
              handleCheck={handleCheck}
            />
          ))}
        </ul>
      </div>

      <Amount total={getTotal(true) / 100} predictedValue={getTotal() / 100} />
    </>
  )
}
