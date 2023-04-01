import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Component/Layout/Layout';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register'
import Home from './Component/Home/Home'
import Cart from './Component/Cart/Cart';
import Products from './Component/Products/Products';
import NotFound from './Component/NotFound/NotFound';

const routes = createBrowserRouter([
  {path:"",element: <Layout />,children:[
    {index:true, element:<Home />},
    {path:"login",element: <Login />},
    {path:"register",element: <Register />},
    {path: "cart",element: <Cart />},
    {path: "products",element: <Products />},


    {path: "*",element: <NotFound />},



    
  ]}
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={routes}></RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
