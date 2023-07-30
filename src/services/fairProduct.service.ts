import {
  CreateFairProductRequest,
  FairProductListResponse,
  FairProductResponse,
  UpdateFairProductRequest,
} from '../types'
import api from './api'

const DOMAIN = (fair: string) => `fairs/${fair}/products`

const getFairProductList = (fair: string): Promise<FairProductListResponse> =>
  api.get(`${DOMAIN(fair)}`)

const createFairProduct = (
  fair: string,
  payload: CreateFairProductRequest,
): Promise<FairProductResponse> => api.post(`${DOMAIN(fair)}`, payload)

const updateFairProduct = (
  fair: string,
  product: string,
  payload: UpdateFairProductRequest,
): Promise<FairProductResponse> =>
  api.put(`${DOMAIN(fair)}/${product}`, payload)

const FairProductService = {
  getFairProductList,
  createFairProduct,
  updateFairProduct,
}

export default FairProductService
