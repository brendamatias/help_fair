export interface Fair {
  _id: string
  name: string
  status: 'IN_PROGRESS' | 'FINISHED'
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
  template: string | null
}
