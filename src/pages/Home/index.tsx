import { useEffect, useState } from 'react'
import { IoAdd } from 'react-icons/io5'
import { formatDate, formatPrice } from '../../utils/format'
import FairService from '../../services/fair.service'
import { Fair } from '../../types'

const Home: React.FC = () => {
  const [fairs, setFairs] = useState<Fair[]>([])

  const getFairList = async () => {
    try {
      const { data } = await FairService.getFairList()

      setFairs(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFairList()
  }, [])

  return (
    <div className="py-8 max-w-md mx-auto px-6 sm:px-0">
      <header className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-white text-2xl font-medium">Lista de feiras</h1>
        </div>
        <div className="flex gap-2">
          <button>
            <IoAdd
              className={'transition-all hover:text-green-500 text-white'}
              size={20}
            />
          </button>
        </div>
      </header>

      <div className="flex gap-2 mb-2">
        <button className="text-white text-xs border rounded-sm px-3 py-1 border-gray-700 hover:bg-green-400 hover:text-gray-950 font-semibold">
          Em andamento
        </button>
        <button className="text-white text-xs border rounded-sm px-3 py-1 border-gray-700 hover:bg-green-400 hover:text-gray-950 font-semibold">
          Finalizadas
        </button>
      </div>

      <ul
        className="max-w-md divide-y divide-gray-700 overflow-y-auto"
        style={{
          height: 'calc(100vh - 154px)',
          marginRight: '-6px',
          paddingRight: 6,
        }}
      >
        {fairs.map(({ id, name, createdAt }) => (
          <li key={id} className="py-3">
            <div className="flex items-center space-x-3">
              <div className="rounded-sm w-2 h-11 bg-red-700" />
              <div className="flex-1 min-w-0">
                <strong className="font-medium truncate text-white text-xs sm:text-sm">
                  {name}
                </strong>

                <div className="flex gap-2 items-center">
                  <span className="text-gray-500 text-xs">
                    Criada em {formatDate(createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <strong className="font-semibold text-white text-xs sm:text-base text-right">
                  {formatPrice(2)}
                </strong>
                <span className="text-gray-500 text-xs">Gastos totais</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
