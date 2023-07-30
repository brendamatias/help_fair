export interface Product {
  _id: string
  name: string
  createdAt: string
}

export interface ProductListResponse {
  data: Product[]
}
