export interface Fair {
  id: string
  name: string
  createdAt: string
}

export interface FairResponse {
  data: Fair
}

export interface FairListResponse {
  data: Fair[]
}

export interface CreateFairRequest {
  name: string
}
