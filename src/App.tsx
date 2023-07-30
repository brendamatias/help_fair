import 'react-toastify/dist/ReactToastify.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ToastContainer } from 'react-toastify'

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer theme="dark" />
    </>
  )
}

export default App
