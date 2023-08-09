import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  MdCalendarToday,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md'
import { PiTagSimple } from 'react-icons/pi'
import { formatDate, formatPrice, monthNames } from '@/utils/format'
import FairService from '@/services/fair.service'
import { Fair } from '@/types'

import logo from '@/assets/logo.svg'
import { FiSearch } from 'react-icons/fi'

export const Home: React.FC = () => {
  const [fairs, setFairs] = useState<Fair[]>([])
  const [date, setDate] = useState(new Date().toString())

  const getFairList = async () => {
    try {
      const dateFormatted = new Date(date)
      const month = (dateFormatted.getMonth() + 1).toString().padStart(2, '0')
      const year = dateFormatted.getFullYear() + 1

      const { data } = await FairService.getFairList(`${month}/${year}`)

      setFairs(data)
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message ||
          'Ocorreu um erro, tente novamente',
      )
    }
  }

  const updateDate = (value: number) => {
    const currentDate = new Date(date)
    currentDate.setMonth(currentDate.getMonth() + value)

    setDate(currentDate.toString())
  }

  useEffect(() => {
    getFairList()
  }, [date])

  return (
    <>
      <header
        className="flex items-center justify-between gap-2 mb-6 px-6 py-4"
        style={{ background: '#121214' }}
      >
        <div className="flex items-center gap-2">
          <img src={logo} alt="SOS Fair Logo" className="sm:w-full w-32" />
        </div>

        <Link
          to="/add"
          className="transition-all hover:bg-violet-500 text-sm text-white font-semibold bg-violet-600 py-3 px-5 rounded-md"
        >
          Nova feira
        </Link>
      </header>

      <div className="px-6 py-4">
        <div className="flex gap-2 justify-between">
          <button onClick={() => updateDate(-1)}>
            <MdKeyboardArrowLeft className="text-white text-2xl" />
          </button>
          <span className="text-white font-semibold">
            {monthNames[new Date(date).getMonth()]}
            {' / '}
            {new Date(date).getFullYear()}
          </span>
          <button onClick={() => updateDate(+1)}>
            <MdKeyboardArrowRight className="text-white text-2xl" />
          </button>
        </div>

        <div className="my-10">
          <div className="flex justify-between items-center">
            <span className="text-lg text-gray-400">Feiras</span>
            <p className="text-sm text-gray-500">
              {fairs.length} iten{fairs.length > 0 && 's'}
            </p>
          </div>

          <div className="flex gap-4 mb-3 mt-3 sm:mb-6">
            <input
              className="rounded-md p-4 text-white placeholder:text-gray-500 w-full"
              style={{ background: '#121214' }}
              placeholder="Buscar uma feira"
            />
            <button className="flex gap-3 items-center text-sm text-violet-500 font-semibold border-violet-500 border rounded-md py-3 px-5 hover:bg-violet-500 hover:text-white transition-all">
              <FiSearch size={18} />
              <span className="hidden sm:block">Buscar</span>
            </button>
          </div>

          <ul>
            {fairs.map(({ _id, name, createdAt }) => (
              <li
                key={_id}
                className="py-5 px-8 my-2 rounded-md"
                style={{ background: '#29292E' }}
              >
                <Link
                  className="items-center md:gap-40 gap-20 w-full hidden sm:flex"
                  to={`/fairs/${_id}`}
                >
                  <strong className="flex-1 font-medium text-white">
                    {name}
                  </strong>

                  <div className="flex flex-col items-end gap-1">
                    <strong className="font-semibold text-white text-right">
                      {formatDate(createdAt)}
                    </strong>
                    <span className="text-gray-500 text-xs text-right">
                      Data de criação
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <strong
                      className="font-semibold text-right"
                      style={{ color: '#00B37E' }}
                    >
                      {formatPrice(2)}
                    </strong>
                    <span className="text-gray-500 text-xs text-right">
                      Gastos totais
                    </span>
                  </div>
                </Link>

                <Link className="block w-full sm:hidden" to={`/fairs/${_id}`}>
                  <span className="text-gray-300 text-md">{name}</span>

                  <strong
                    className="font-semibold text-xl block mb-4 mt-1"
                    style={{ color: '#00B37E' }}
                  >
                    {formatPrice(200)}
                  </strong>

                  <div className="flex justify-between">
                    <div className="flex items-center gap-1 text-gray-500">
                      <PiTagSimple size={16} />
                      <span className="text-md">Janta</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <MdCalendarToday size={16} />
                      <span className="text-md">{formatDate(createdAt)}</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
