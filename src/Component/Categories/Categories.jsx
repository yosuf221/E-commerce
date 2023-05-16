import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './Categories.module.css'
import Slider from "react-slick";


export default function Categories() {


  const [categories , setCategories] = useState([])

  async function getcategories(){
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    setCategories(data.data)
  }

  useEffect(() => {
    getcategories()
  } , [])


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
  };

  





  return (
    <>
    <Slider {...settings}>
      {categories.map((category) =>  <div>
        <img src={category.image} height={300} className='w-100' alt="" />
        <h3 className='h6'>{category.name}</h3>
      </div> )}
    </Slider>
    </>
  )
}
