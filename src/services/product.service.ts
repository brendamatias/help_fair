import { ProductListResponse } from '../types'
import api from './api'

const DOMAIN = 'products'

const getProductList = (): Promise<ProductListResponse> => api.get(`${DOMAIN}`)

const ProductService = {
  getProductList,
}

export default ProductService
