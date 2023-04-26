import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Component/Layout/Layout';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register'
import Home from './Component/Home/Home'
import Cart from './Component/Cart/Cart';
import Products from './Component/Products/Products';
import NotFound from './Component/NotFound/NotFound';

import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react';
import ProtectedRoutes from './Component/ProtectedRoutes/ProtectedRoutes';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import CounterContextProvider from './Context/CounterContext';
import CartContextProvider from './Context/CartContext';

import { Toaster } from 'react-hot-toast';
import Checkout from './Component/Checkout/Checkout';
import AllOrders from './Component/AllOrders/AllOrders';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import InverseProtectRoute from './Component/InverseProtectRoute/InverseProtectRoute';



function App() {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUser()
    }
  }, [])

  function saveUser() {
    let encodedToken = localStorage.getItem("userToken")
    let decoded = jwtDecode(encodedToken);
    // console.log(decoded);
    setUserData(decoded)
  }




  const routes = createHashRouter([
    {
      path: "", element: <Layout userData={userData} setUserData={setUserData} />, children: [
        { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: "home", element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: "login", element: <InverseProtectRoute><Login saveUser={saveUser} /></InverseProtectRoute> },
        { path: "register", element:<InverseProtectRoute><Register /></InverseProtectRoute>  },
        { path: "cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: "checkout", element: <ProtectedRoutes><Checkout /></ProtectedRoutes> },
        { path: "allorders", element: <ProtectedRoutes><AllOrders></AllOrders></ProtectedRoutes> },
        { path: "products", element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        { path: "product-details/:id", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },


        { path: "*", element: <NotFound/> },




      ]
    }
  ])




  return <>
    <Provider store={store}>
    <CartContextProvider>
      <CounterContextProvider>
        <Toaster></Toaster>
        <RouterProvider router={routes}></RouterProvider>
      </CounterContextProvider>
    </CartContextProvider>
    </Provider>

  </>
}

export default App;
