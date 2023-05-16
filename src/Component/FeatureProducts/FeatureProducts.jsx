import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import styles from './FeatureProducts.module.css'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';


export default function FeatureProducts() {

  let {createCart , setNumOfCartItems} = useContext(CartContext)

  const [allProducts , setAllProducts] = useState([])
  
  async function getProducts(){
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    setAllProducts(data.data)
  }

  async function generateCart(productId){
      let response = await createCart(productId)
      console.log(response);
      if (response.data.status == "success") {
        toast.success(response.data.message, {
          position : "bottom-right",
          className:"text-center border-success border-5 box-shadow"
        })
        setNumOfCartItems(response.data.numOfCartItems)
      }else{
        toast.error(response.data.message, {
          position : "bottom-right",
          className:"text-center border-success border-5 box-shadow"
        })
      }
  }




  useEffect(() => {
    getProducts()
  } , [])

  return (
    <>
    {allProducts.length > 0 ?      <div className="container py-5">
        <div className="row">
          {allProducts.map((product) => 
          <div className="col-md-2" key={product.id}>
            <div className="product px-2 py-3">
              <Link to={'/product-details/'+product.id}>
              <img src={product.imageCover} className='w-100' alt="" />
              <p className='t text-danger'>{product.subcategory.name}</p>
                  
              <h3 className='h6'>{product.title.split(" ").splice(0,2).join(" ")}</h3>
              <div className='d-flex justify-content-between'>
              <p>{product.price} EGP</p>
              <div>
                <i className='fa fa-star text-warning'></i>
                {product.ratingsAverage}
              </div>
              </div>

              </Link>



              <button onClick={() => generateCart(product._id)} className='btn bg-success text-white w-100'>+Add</button>



            </div>
          </div>
          )}
        </div>
      </div>
 :         <div className='bg-transparent position-fixed top-0 d-flex justify-content-center align-items-center bottom-0 end-0 start-0 '>

 <i className='fa-solid fa-spinner fa-7x fa-spin'></i>

</div>
}




    </>
  )
}
