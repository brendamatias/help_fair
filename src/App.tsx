import 'react-toastify/dist/ReactToastify.css'
import Modal from 'react-modal'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import router from './router'

Modal.setAppElement('#root')

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer theme="dark" />
    </>
  )
}

export default App
