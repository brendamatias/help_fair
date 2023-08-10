import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthService from '@/services/auth.service'
import { Button, Input } from '@/components'
import bg from '@/assets/bg-auth.jpg'

export const SignUp: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault()
    setLoading(true)
    try {
      await AuthService.signUp({
        name,
        email,
        password,
      })

      toast.success('Usuário cadastrado com sucesso!')
      setLoading(false)
      navigate('/')
    } catch (error: any) {
      setLoading(false)
      toast.error(
        error?.response?.data?.error?.message ||
          'Ocorreu um erro, tente novamente',
      )
    }
  }

  return (
    <div className="lg:grid grid-cols-2 items-center">
      <div className="h-screen p-8 lg:block hidden">
        <img
          src={bg}
          alt="Background Feira"
          className="object-cover w-full h-full rounded-md"
        />
      </div>

      <div className="flex flex-col items-center justify-between h-screen py-8">
        <div className="max-w-md m-auto px-6 sm:px-0 flex flex-col justify-center space-y-10">
          <div>
            <h1 className="text-2xl font-bold leading-tight tracking-tight md:text-4xl text-slate-900">
              Create account
            </h1>
            <p className="text-slate-400 font-normal text-md md:text-lg mt-2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-slate-700"
              >
                Nome
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o seu nome"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-slate-700"
              >
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite o seu email"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-slate-700"
              >
                Senha
              </label>

              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a sua senha"
                required
              />
            </div>

            <Button
              type="submit"
              className="flex justify-center w-full"
              disabled={loading}
            >
              {loading ? 'Carregando' : 'Cadastrar'}
            </Button>
          </form>

          <div className="flex gap-1 justify-center items-center text-white text-sm">
            <span className="text-slate-400 ">Já tem uma conta? </span>{' '}
            <Link to="/" className="font-medium text-blue-400">
              Fazer login
            </Link>
          </div>
        </div>
        <span className="text-slate-400 text-xs">
          © 2023 All rights reserved
        </span>
      </div>
    </div>
  )
}
