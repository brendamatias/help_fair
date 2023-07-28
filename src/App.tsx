import { FormEvent, useState } from 'react'
import { formatPrice } from './utils/format'
import { Input, Footer } from './components'
import feira from './feira.json'

type Item = {
  name: string
  price: number
  qty: number
  checked: boolean
}

const App: React.FC = () => {
  const [newItem, setNewItem] = useState('')
  const [items, setItems] = useState<Item[]>(feira)

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()

    if (!newItem) {
      return
    }

    setItems([...items, { name: newItem, price: 0, qty: 0, checked: false }])
    setNewItem('')
  }

  const findIndex = (name: string) => {
    return items.findIndex((item) => item.name === name)
  }

  const handleIncrementOrDecrement = (name: string, value: number) => {
    const index = findIndex(name)
    const newItems = [...items]
    newItems[index].qty = newItems[index].qty + value

    setItems(newItems)
  }

  const handleCheck = (name: string) => {
    const index = findIndex(name)
    const newItems = [...items]
    newItems[index].checked = !newItems[index].checked

    setItems(newItems)
  }

  const getTotal = () => {
    return items.reduce((total, { price, qty }) => total + price * qty, 0)
  }

  return (
    <>
      <div className="py-14 max-w-md mx-auto">
        <form
          onSubmit={handleAddRepository}
          className="max-w-md flex mx-auto mb-10"
        >
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Digite o nome do item"
            className="text-sm h-12 px-6 rounded-l-md w-full"
            style={{ color: '#3a3a3a' }}
          />
          <button
            type="submit"
            className="w-52 text-white bg-green-500 rounded-r-md text-sm"
          >
            Inserir
          </button>
        </form>

        <ul
          className="max-w-md divide-y divide-gray-700 overflow-y-auto"
          style={{
            height: 'calc(100vh - 325px)',
            marginRight: '-6px',
            paddingRight: 6,
          }}
        >
          {items.map(({ name, price, qty, checked }) => (
            <li key={name} className="py-3">
              <div className="flex items-center space-x-4">
                <button onClick={() => handleCheck(name)}>
                  <svg
                    className={`w-3.5 h-3.5 mr-2 flex-shrink-0 transition-all ${
                      checked
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
                  <strong className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {name}
                  </strong>

                  <div className="flex gap-2 items-center">
                    <button
                      className="text-sm font-medium text-gray-400 disabled:text-gray-700"
                      disabled={qty === 0}
                      onClick={() => handleIncrementOrDecrement(name, -1)}
                    >
                      -
                    </button>
                    <span className="text-sm text-gray-400">{qty}</span>
                    <button
                      className="text-sm font-medium text-gray-400"
                      onClick={() => handleIncrementOrDecrement(name, +1)}
                    >
                      +
                    </button>
                    <span className="text-sm text-gray-500 truncate dark:text-gray-400">
                      unidade{qty > 1 && 's'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <Input defaultValue={price} />
                  <span className="text-gray-500 text-xs">
                    Total: {formatPrice((price / 100) * qty)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Footer total={getTotal() / 100} />
    </>
  )
}

export default App
