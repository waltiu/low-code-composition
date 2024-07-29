import { RouterProvider } from 'react-router-dom'
import routes from './routers'
import './App.css'
import '@packages/editor'

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
