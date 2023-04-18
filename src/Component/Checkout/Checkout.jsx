import React, { useContext } from 'react'
import styles from './Checkout.module.css'
import { useFormik } from 'formik'
import{CartContext} from '../../Context/CartContext'

export default function Checkout() {
   
  // let {generateOnlinePayment} = useContext(CartContext)

  let {generateOnlinePayment,cartId} = useContext(CartContext)

  async function handlePayment(values){
      let {data} = await generateOnlinePayment(cartId ,values)
      console.log(data);
      if(data.session){
        window.location.href = data.session.url
      }
  }



  let formik = useFormik({
    initialValues: {
      "details": "",
      "phone": "",
      "city": ""
    },
    onSubmit:handlePayment
  })
  return (
    <>
    <div className="container">
      <form className='w-75 mx-auto my-5' onSubmit={formik.handleSubmit}>
        <label htmlFor="details">Details</label>
        <input type="text" className='form-control mb-3' onChange={formik.handleChange} name='details' id='details' value={formik.values.details} />
        
        
        <label htmlFor="phone">Phone</label>
        <input type="tel" className='form-control mb-3' onChange={formik.handleChange} name='phone' id='phone' value={formik.values.phone} />
        
        
        <label htmlFor="city">City</label>
        <input type="text" className='form-control mb-3' onChange={formik.handleChange} name='city' id='city' value={formik.values.city} />



      <button type='submit' className='btn btn-danger w-100'>Pay</button>
      </form>
    </div>
    </>
  )
}
