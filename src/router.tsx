import { createBrowserRouter } from 'react-router-dom'

import { Home, CreateFair, FairDetails } from '@/pages'

const routes = [
  { path: '/', element: <Home /> },
  { path: '/add', element: <CreateFair /> },
  { path: '/fairs/:id', element: <FairDetails /> },
]

const router = createBrowserRouter(routes)

export default router
