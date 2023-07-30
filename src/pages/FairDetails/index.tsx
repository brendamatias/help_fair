import { FormEvent, useEffect, useState } from 'react'
import { IoChevronBack, IoAdd, IoSearch } from 'react-icons/io5'
import { formatPrice } from '@/utils/format'
import { CurrencyInput, Amount, CreatableSelect } from '@/components'
import { Link, useParams } from 'react-router-dom'
import { Fair, FairProduct } from '@/types'
import FairService from '@/services/fair.service'
import FairProductService from '@/services/fairProduct.service'
import ProductService from '@/services/product.service'

type Item = {
  name: string
  price: number
  qty: number
  checked: boolean
}

export const FairDetails: React.FC = () => {
  const { id = '' } = useParams()

  const [fair, setFair] = useState<Fair>()
  const [items, setItems] = useState<FairProduct[]>([])
  const [filteredItems, setFilteredItems] = useState<FairProduct[]>([])
  const [options, setOptions] = useState<{ value: string; label: string }[]>([])

  const [name, setName] = useState('')
  const [search, setSearch] = useState(false)
  const [filter, setFilter] = useState('')

  const filterBySearch = (query: string) => {
    setFilter(query)

    if (!query) return setFilteredItems(items)

    const filtered = items.filter(
      (item) => item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1,
    )

    setFilteredItems(filtered)
  }

  const findIndex = (_id: string) => {
    return items.findIndex((item) => item._id === _id)
  }

  const handleCheck = (name: string) => {
    const index = findIndex(name)
    const newItems = [...items]
    newItems[index].bought = !newItems[index].bought

    setItems(newItems)
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

  const handleIncrementOrDecrement = async (productId: string, qty: number) => {
    const index = findIndex(productId)

    try {
      const { data } = await FairProductService.updateFairProduct(
        id,
        productId,
        {
          qty,
        },
      )
      const newItems = [...items]

      newItems[index] = data

      setItems(newItems)
      setFilteredItems(newItems)
    } catch (error) {
      console.log(error)
    }
  }

  const getFairList = async () => {
    try {
      const { data } = await FairService.getFair(id)

      setFair(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getFairProductList = async () => {
    try {
      const { data } = await FairProductService.getFairProductList(id)

      setItems(data)
      setFilteredItems(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getProductList = async () => {
    try {
      const { data } = await ProductService.getProductList()
      const optionsFormatted = data.map(({ _id, name }) => {
        return { value: name, label: name }
      })

      setOptions(optionsFormatted)
    } catch (error) {
      console.log(error)
    }
  }

  const createProduct = async (value: string, newValue?: boolean) => {
    try {
      const { data } = await FairProductService.createFairProduct(id, {
        name: value,
      })

      const newItems = [...items, data]
      setItems(newItems)
      setFilteredItems(newItems)
      setName('')

      if (newValue) {
        setOptions([...options, { value, label: value }])
      }
    } catch (error: any) {
      console.log(error.response)
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
          <div className="flex gap-2">
            <button onClick={() => setSearch(true)}>
              <IoSearch
                className={`transition-all hover:text-green-500 ${
                  search ? 'text-green-500' : 'text-white'
                }`}
                size={18}
              />
            </button>
            <button onClick={() => setSearch(false)}>
              <IoAdd
                className={`transition-all hover:text-green-500 ${
                  !search ? 'text-green-500' : 'text-white'
                }`}
                size={20}
              />
            </button>
          </div>
        </header>

        {search ? (
          <input
            value={filter}
            onChange={(e) => filterBySearch(e.target.value)}
            placeholder="Digite o nome do item"
            className="text-sm h-12 px-6 rounded-md w-full mb-6"
            style={{ color: '#3a3a3a' }}
          />
        ) : (
          <div className="max-w-md flex mx-auto mb-6">
            <CreatableSelect options={options} onCreate={createProduct} />
            {/* <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome do item"
              className="text-sm h-12 px-6 rounded-l-md w-full"
              style={{ color: '#3a3a3a' }}
            /> */}
            {/* <button
              type="submit"
              className="w-52 text-white bg-green-500 rounded-r-md text-sm"
            >
              Inserir
            </button> */}
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
          {filteredItems.map(({ _id, name, price, qty, bought }) => (
            <li key={name} className="py-3">
              <div className="flex items-center space-x-4">
                <button onClick={() => handleCheck(name)}>
                  <svg
                    className={`w-3.5 h-3.5 mr-2 flex-shrink-0 transition-all ${
                      bought
                        ? 'text-green-400'
                        : 'text-gray-400 hover:text-green-400'
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
                  <strong className="font-medium text-gray-900 truncate dark:text-white text-xs sm:text-sm">
                    {name}
                  </strong>

                  <div className="flex gap-2 items-center">
                    <button
                      className="text-xs sm:text-sm font-medium text-gray-400 disabled:text-gray-700"
                      disabled={qty === 0}
                      onClick={() => handleIncrementOrDecrement(_id, qty - 1)}
                    >
                      -
                    </button>
                    <span className="text-xs sm:text-sm text-gray-400">
                      {qty}
                    </span>
                    <button
                      className="text-xs sm:text-sm font-medium text-gray-400"
                      onClick={() => handleIncrementOrDecrement(_id, qty + 1)}
                    >
                      +
                    </button>
                    <span className="text-xs sm:text-sm text-gray-500 truncate dark:text-gray-400">
                      unidade{qty > 1 && 's'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <CurrencyInput defaultValue={price} />
                  <span className="text-gray-500 text-xs">
                    Total: {formatPrice((price / 100) * qty)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Amount total={getTotal(true) / 100} predictedValue={getTotal() / 100} />
    </>
  )
}
