export interface User {
  _id: string
  name: string
  email: string
  createdAt: string
}

export interface SignInResponse {
  data: {
    user: User
    token: string
  }
}

export interface SignInRequest {
  email: string
  password: string
}

export interface SignUpRequest {
  name: string
  email: string
  password: string
}
