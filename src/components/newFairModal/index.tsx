import Modal from 'react-modal'
import { FormEvent, useEffect, useState } from 'react'
import { Button, Input, Select } from '..'
import FairService from '@/services/fair.service'
import { Fair } from '@/types'
import { toast } from 'react-toastify'
import { MdClose } from 'react-icons/md'

type NewFairModalProps = {
  isOpen: boolean
  onRequestClose: () => void
  onSubmit: () => void
}

export const NewFairModal = ({
  isOpen,
  onRequestClose,
  onSubmit,
}: NewFairModalProps) => {
  const [fairs, setFairs] = useState<Fair[]>([])
  const [name, setName] = useState('')
  const [template, setTemplate] = useState('')
  const [useTemplate, setUseTemplate] = useState(false)
  const [loading, setLoading] = useState(false)

  async function getFairList() {
    try {
      const { data } = await FairService.getFairList()

      setFairs(data)

      if (data.length > 0) {
        setTemplate(data[0]._id)
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message ||
          'Ocorreu um erro, tente novamente',
      )
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoading(true)
    try {
      await FairService.createFair({
        name,
        template: useTemplate ? template : null,
      })

      toast.success('Feira criada com sucesso!')
      setLoading(false)
      setName('')
      setTemplate(fairs[0]._id)
      onRequestClose()
      onSubmit()
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content fixed md:relative bottom-0 w-full p-6 md:p-12"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="absolute top-6 right-6 text-slate-500"
      >
        <MdClose size={24} />
      </button>
      <div>
        <h2 className="font-bold text-xl md:text-2xl text-slate-700">
          Nova feira
        </h2>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex flex-col gap-4 mb-10">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
            />
            <Select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              options={fairs}
              required
              disabled={!useTemplate}
            />
            <div className="flex items-start">
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
                className="ml-2 text-sm font-medium text-slate-500"
              >
                Usar feira de template
              </label>
            </div>
          </div>

          <Button
            type="submit"
            className="flex items-center w-full justify-center"
            disabled={loading}
          >
            {loading ? 'Carregando' : 'Cadastrar'}
          </Button>
        </form>
      </div>
    </Modal>
  )
}
