export interface FairProduct {
  _id: string
  name: string
  price: number
  qty: number
  bought: boolean
  createdAt: string
}

export interface FairProductResponse {
  data: FairProduct
}

export interface FairProductListResponse {
  data: FairProduct[]
}

export interface CreateFairProductRequest {
  name: string
}

export interface UpdateFairProductRequest {
  name?: string
  price?: number
  qty?: number
  bought?: boolean
}
