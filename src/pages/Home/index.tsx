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
import { Button, Input } from '@/components'

export const Home: React.FC = () => {
  const [fairs, setFairs] = useState<Fair[]>([])
  const [date, setDate] = useState(new Date().toString())
  const [search, setSearch] = useState('')

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
      <header className="mb-6 py-4 border-b-2 border-slate-200">
        <div className="max-w-screen-lg mx-auto px-6 flex items-center justify-between gap-2 ">
          <div className="flex items-center gap-2">
            <img src={logo} alt="SOS Fair Logo" className="sm:w-full w-32" />
          </div>

          <Button theme="outlined">Nova feira</Button>
        </div>
      </header>

      <div className="max-w-screen-lg mx-auto px-6 py-4">
        <div className="flex gap-2 justify-between">
          <button onClick={() => updateDate(-1)}>
            <MdKeyboardArrowLeft className="text-slate-600 text-2xl" />
          </button>
          <span className="text-slate-600 font-semibold">
            {monthNames[new Date(date).getMonth()]}
            {' / '}
            {new Date(date).getFullYear()}
          </span>
          <button onClick={() => updateDate(+1)}>
            <MdKeyboardArrowRight className="text-slate-600 text-2xl" />
          </button>
        </div>

        <div className="my-10">
          <div className="flex justify-between items-center">
            <span className="text-2xl text-slate-700 font-bold">Feiras</span>
            <p className="text-sm text-slate-400">
              {fairs.length} iten{fairs.length > 0 && 's'}
            </p>
          </div>

          <div className="flex gap-4 mb-3 mt-3 sm:mb-6">
            <Input value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button>
              <FiSearch size={18} />
              <span className="hidden sm:block">Buscar</span>
            </Button>
          </div>

          <ul className="flex flex-col gap-2">
            {fairs.map(({ _id, name, createdAt }) => (
              <li
                key={_id}
                className="py-5 px-8 rounded-md"
                style={{
                  background: '#FEFEFE',
                  boxShadow: '0px 2px 12px 0px rgba(0, 0, 0, 0.04)',
                }}
              >
                <Link
                  className="items-center md:gap-40 gap-20 w-full hidden sm:flex"
                  to={`/fairs/${_id}`}
                >
                  <strong className="flex-1 font-medium text-slate-800">
                    {name}
                  </strong>

                  <div className="flex flex-col items-end gap-1">
                    <strong className="font-semibold text-slate-800 text-right">
                      {formatDate(createdAt)}
                    </strong>
                    <span className="text-slate-400 text-xs text-right">
                      Data de criação
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <strong className="font-semibold text-right text-green-400">
                      {formatPrice(2)}
                    </strong>
                    <span className="text-slate-400 text-xs text-right">
                      Gastos totais
                    </span>
                  </div>
                </Link>

                <Link className="block w-full sm:hidden" to={`/fairs/${_id}`}>
                  <span className="text-slate-800 font-medium text-md">
                    {name}
                  </span>

                  <strong className="font-semibold text-md block mb-4 mt-1 text-green-400">
                    {formatPrice(200)}
                  </strong>

                  <div className="flex justify-between">
                    <div className="flex items-center gap-1 text-slate-400">
                      <PiTagSimple size={14} />
                      <span className="text-xs">Janta</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <MdCalendarToday size={14} />
                      <span className="text-xs">{formatDate(createdAt)}</span>
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
