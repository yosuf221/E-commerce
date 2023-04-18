import React, { useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { useContext } from 'react'
import { CounterContext } from '../../Context/CounterContext'
import { CartContext } from '../../Context/CartContext'
import { Offline} from "react-detect-offline";
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom'


export default function Cart() {


  const [cartDetails, setCartDetails] = useState({})


  let { getCart, updateCart, removeCartItem } = useContext(CartContext)

  async function getCartDetails() {
    let res = await getCart()
    // console.log(res);
    setCartDetails(res.data)
  }


  async function updateCartHandler(id, count) {
    let res = await updateCart(id, count)
    console.log(res);
    setCartDetails(res.data)
  }

  async function deleteCartHandler(id) {
    let res = await removeCartItem(id)
    console.log(res);
    setCartDetails(res.data)
  }




  useEffect(() => {
    getCartDetails()
  })
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
            </Helmet>


      <Offline>Only shown offline (surprise!)</Offline>

      {cartDetails && cartDetails.data &&
      // {cartDetails.length > 0? : }
        <div className="container p-5 my-5">
          <div className='pdet p-5'>
            <h3>Cart Details</h3>
            <h4>Total price : {cartDetails.data.totalCartPrice}</h4>



            {cartDetails.data.products.map((product) =>
              <div key={product.product._id} className='row  border-bottom border-2 border-dark p-5'>

                <div className="col-md-1">
                  <img src={product.product.imageCover} className='w-100' alt="" />
                </div>

                <div className="col-md-11 d-flex justify-content-between">

                  <div>
                    <h4>{product.product.title}</h4>
                    <p className='text-success fw-bolder'>{product.price} EGP</p>
                    <button className='btn text-danger' onClick={() => deleteCartHandler(product.product._id)}> <i className='fa fa-trash'></i> Remove</button>
                  </div>

                  <div className='d-flex align-items-center'>
                    <button className='btn btn-success text-white' onClick={() => updateCartHandler(product.product._id, product.count + 1)}>+</button>
                    <p className='mx-3 mb-0'>{product.count}</p>
                    <button className='btn btn-danger text-white' onClick={() => updateCartHandler(product.product._id, product.count - 1)}>-</button>
                  </div>

                </div>
              </div>
            )}
              <Link to={'/checkout'} className='btn bg-danger text-white my-5'>procced to payment </Link>

          </div>
        </div>

      }

    </>
  )
}
