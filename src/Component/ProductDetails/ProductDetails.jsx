import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './ProductDetails.module.css'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import Products from '../Products/Products';


export default function ProductDetails() {


  let { createCart } = useContext(CartContext)

  let { id } = useParams();

  // console.log(id);
  const [productDetails, setProductDetails] = useState({})

  async function getProductDetails() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    console.log(data.data);
    setProductDetails(data.data)
  }

  useEffect(() => {
    getProductDetails()
  }, [])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  return (
    <>


      <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-4">

        <Slider {...settings}>
      {productDetails?.images?.map((img) =>  <div>
        <img src={img}  className='w-100' alt="" />
      </div> )}
       
    </Slider>
        </div>
        <div className="col-md-8">
          <h1>{productDetails.title}</h1>
          <p>{productDetails.description}</p>
          <div className='d-flex justify-content-between'>
              <p>{productDetails.price} EGP</p>
              <div>
                <i className='fa fa-star text-warning'></i>
                {productDetails.ratingsAverage}
              </div>
              </div>
              <button onClick={() => createCart(productDetails.id) } className='btn bg-success text-white w-100'>+Add</button>

        </div>
      </div>
    </div>




    </>
  )
}



{/* <div className='bg-secondary position-fixed top-0 d-flex justify-content-center align-items-center bottom-0 end-0 start-0 '>

<i className='fa-solid fa-spinner fa-7x fa-spin'></i>

</div> */}
