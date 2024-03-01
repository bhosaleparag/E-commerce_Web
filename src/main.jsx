import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  RouterProvider,
  Route,
  createRoutesFromElements,
  createBrowserRouter 
} from 'react-router-dom'
import Cart from './components/Cart.jsx'
import Login from './components/Login.jsx'
import ProductList from './components/ProductList.jsx'
import './index.css'
import Layout from './Layout.jsx'


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout/>}>
    <Route index element={<ProductList/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/cart" element={<Cart/>} />
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
