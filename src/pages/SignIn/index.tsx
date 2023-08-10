import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthService from '@/services/auth.service'
import { Button, Input } from '@/components'
import bg from '@/assets/bg-auth.jpg'

export const SignIn: React.FC = () => {
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
      const { data } = await AuthService.signIn({
        email,
        password,
      })

      localStorage.setItem('help_fair', data.token)

      setLoading(false)
      navigate('/home')
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
      <div className="flex flex-col items-center justify-between h-screen py-8">
        <div className="max-w-md m-auto px-6 sm:px-0 flex flex-col justify-center space-y-10">
          <div>
            <h1 className="text-2xl font-bold leading-tight tracking-tight md:text-4xl text-slate-900">
              Welcome Back
            </h1>
            <p className="text-slate-400 font-normal text-md md:text-lg mt-2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
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

              <div className="flex justify-end mt-2">
                <Link
                  to="/sign-up"
                  className="text-right text-sm font-medium text-blue-400"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="flex justify-center w-full"
              disabled={loading}
            >
              {loading ? 'Carregando' : 'Entrar'}
            </Button>
          </form>

          <div className="flex gap-1 justify-center items-center text-white text-sm">
            <span className="text-slate-400 ">Dont you have an account? </span>{' '}
            <Link to="/sign-up" className="font-medium text-blue-400">
              Create account
            </Link>
          </div>
        </div>
        <span className="text-slate-400 text-xs">
          © 2023 All rights reserved
        </span>
      </div>

      <div className="h-screen p-8 lg:block hidden">
        <img
          src={bg}
          alt="Background Feira"
          className="object-cover w-full h-full rounded-md"
        />
      </div>
    </div>
  )
}
