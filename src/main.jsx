import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from "./Store/store.js";

//Pages
import { Home, Buy, Rent, Property, LoginAgent, SignupAgent, AddNewProperties, Message } from "./Pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/buy' element={<Buy />} />
      <Route path='/rent' element={<Rent />} />
      <Route path='/property/:id' element={<Property />} />
      <Route path='/login-as-agent' element={<LoginAgent />} />
      <Route path='/signup-as-agent' element={<SignupAgent />} />
      <Route path='/add-new-properties' element={<AddNewProperties />} />
      <Route path='/message' element={<Message />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
