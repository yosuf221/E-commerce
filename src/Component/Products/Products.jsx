import React from 'react'
import styles from './Products.module.css'
import { useSelector } from 'react-redux'
import { increase,getProducts } from '../../Redux/ProductSlice';
import { useDispatch } from 'react-redux';
import {useEffect} from 'react'


export default function Products() {


  let dispatch = useDispatch()
  let {counter,products} = useSelector((state) => state.productRed)

  useEffect(() =>{
    dispatch(getProducts())
    console.log(products);
  })

  
  return (
    <>
    <div className="container py-5">
    <h1 className='text-danger'>products : {counter}</h1>
    <button className='btn btn-danger' onClick={()=> dispatch(increase(20))}>add ++</button>

    </div>
    </>
  )
}
