import { CreateFairRequest, FairListResponse, FairResponse } from '../types'
import api from './api'

const DOMAIN = 'fairs'

const getFairList = (): Promise<FairListResponse> => api.get(`${DOMAIN}`)

const getFair = (id: string): Promise<FairResponse> =>
  api.get(`${DOMAIN}/${id}`)

const createFair = (payload: CreateFairRequest): Promise<FairResponse> =>
  api.post(`${DOMAIN}`, payload)

const FairService = {
  getFair,
  getFairList,
  createFair,
}

export default FairService
