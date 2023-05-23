import { Header, Footer } from './components'
import {
  About,
  ErrorPage,
  Home,
  Poll,
  RockPaperScissors,
  SimpleStorage,
  TaskManage,
  TransferToken,
} from './pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Container, useColorModeValue } from '@chakra-ui/react'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  {
    path: '/tokentransfer',
    element: <TransferToken />,
  },
  {
    path: '/simplestorage',
    element: <SimpleStorage />,
  },
  {
    path: '/taskmanage',
    element: <TaskManage />,
  },
  {
    path: '/poll',
    element: <Poll />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/rps',
    element: <RockPaperScissors />,
  },
  {
    path: '/*',
    element: <ErrorPage />,
  },
])

function App() {
  return (
    <div className="App">
      <Header />
      <div className='MainContent' >
        <RouterProvider router={router} />
      </div>
      <Footer />
    </div>
  )
}

export default App
