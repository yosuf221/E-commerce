import React, { useContext } from 'react'
import styles from './NavBar.module.css'
import logo from '../../assests/images/logo.png'
import { Link } from 'react-router-dom'
import { CounterContext } from '../../Context/CounterContext'
import { CartContext } from '../../Context/CartContext'
import { useDispatch, useSelector } from 'react-redux'
import { decrease } from '../../Redux/ProductSlice'

export default function NavBar({ userData, logOut }) {

  let { numOfCartItems } = useContext(CartContext)

    let dispatch = useDispatch()
    let {counter} = useSelector((state) => state.productRed)



  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top ">
        <div className="container">
          <a className="navbar-brand m-0" href="#">
            <img src={logo} alt="" className='w-25' />
            {counter}
            <button className='btn btn-danger' onClick={()=> dispatch(decrease())}>dec --</button>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {userData && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to={''}>Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='products'>Product</Link>
              </li>
              <li className="nav-item position-relative">
                <Link className="nav-link" to='cart'>
                  <i className='fa fa-shopping-cart fa-lg'></i>
                  <div className="badge bg-success position-absolute top-0 end-0" >{numOfCartItems}</div>
                </Link>
              </li>
            </ul>
            }


            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className='mx-2'>
                <i className='fa-brands fa-facebook-f text-white'></i>
              </li>
              <li className='mx-2'>
                <i className='fa-brands fa-twitter text-white'></i>
              </li>
              <li className='mx-2'>
                <i className='fa-brands fa-instagram text-white'></i>
              </li>
            </ul>




            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              {userData ? <li className="nav-item">
                <span className="ghgh nav-link" onClick={logOut}>LogOut</span>
              </li> : <>        <li className="nav-item">
                <Link className="nav-link" to='login'>Login</Link>
              </li>
                <li className="nav-item">
                  <Link className="nav-link" to='register'>Register</Link>
                </li>
              </>}



            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}
