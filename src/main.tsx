import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './routes/Home';
import Login from './routes/Login';
import Users from './routes/Users';
import ErrorPage from './error-page';
import Root from './routes/Root';
import {store} from './app/store.js'
import { Provider } from 'react-redux'
import { getUsersById } from './services/apiCalls.js';
import Loading from './components/Loading';
import User from './routes/User';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children : [

      {
        path: "/",
        element: <Home/>
      },

      {
        path: "/home",
        element: <Home/>
      },
    
      {
        path: "/login",
        element: <Login/>
      },
    
      {
        path: "/users",
        element: <Users/>,
      },
      {
        path: "/user/:id",
        element: <User/>,
        loader : getUsersById,
        hydrateFallbackElement : <Loading/>
      }
    ]

  }

]);


const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)

  root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}