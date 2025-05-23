import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

//Pages
import { Home, Buy, Rent, Property } from "./Pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/buy' element={<Buy />} />
      <Route path='/rent' element={<Rent />} />
      <Route path='/property/:id' element={<Property />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
