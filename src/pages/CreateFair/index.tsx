import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IoChevronBack } from 'react-icons/io5'
import FairService from '@/services/fair.service'
import { Fair } from '@/types'

export const CreateFair: React.FC = () => {
  const [fairs, setFairs] = useState<Fair[]>([])
  const [name, setName] = useState('')
  const [template, setTemplate] = useState('')
  const [useTemplate, setUseTemplate] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const getFairList = async () => {
    try {
      const { data } = await FairService.getFairList()

      setFairs(data)
      setTemplate(data[0]._id)
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message ||
          'Ocorreu um erro, tente novamente',
      )
    }
  }

  console.log(template)

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault()

    setLoading(true)
    try {
      await FairService.createFair({
        name,
        template: useTemplate ? template : null,
      })

      navigate('/')
      toast.success('Feira criada com sucesso!')
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      toast.error(
        error?.response?.data?.error?.message ||
          'Ocorreu um erro, tente novamente',
      )
    }
  }

  useEffect(() => {
    getFairList()
  }, [])

  return (
    <div className="py-8 max-w-md mx-auto px-6 sm:px-0">
      <header className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <IoChevronBack className="text-white" size={16} />
          </Link>
          <h1 className="text-white text-2xl font-medium">Criar feira</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white"
          >
            Nome
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border text-sm rounded-md block w-full h-12 px-6 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Digite o nome da feira"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white"
          >
            Feira Template
          </label>
          <select
            id="name"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="border text-sm rounded-md block w-full h-12 px-6 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            placeholder="Digite o nome da feira"
            required
            disabled={!useTemplate}
          >
            {fairs.map((fair) => (
              <option key={fair._id} value={fair._id}>
                {fair.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="useTemplate"
              type="checkbox"
              checked={useTemplate}
              onChange={(e) => setUseTemplate(e.target.checked)}
              className="w-4 h-4 border rounded focus:ring-3  bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="useTemplate"
            className="ml-2 text-sm font-medium text-gray-300"
          >
            Usar feira de template
          </label>
        </div>
        <button
          type="submit"
          className="bg-violet-600 text-sm text-white rounded-md p-5 w-full"
          disabled={loading}
        >
          {loading ? 'Carregando' : 'Criar feira'}
        </button>
      </form>
    </div>
  )
}
