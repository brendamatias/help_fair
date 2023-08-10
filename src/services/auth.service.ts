import { SignInRequest, SignInResponse, SignUpRequest } from '@/types'
import api from './api'

const DOMAIN = 'sessions'

const signIn = (payload: SignInRequest): Promise<SignInResponse> =>
  api.post(`${DOMAIN}`, payload)

const signUp = (payload: SignUpRequest): Promise<void> =>
  api.post('users', payload)

const AuthService = {
  signIn,
  signUp,
}

export default AuthService
