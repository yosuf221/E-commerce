import React, { useState } from 'react'
import styles from './Home.module.css'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import Categories from '../Categories/Categories'
import {Helmet} from "react-helmet";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
    {/* <Products></Products> */}
       <Helmet>
                <meta charSet="utf-8" />
                <title>Home Page</title>
            </Helmet>
    <Categories></Categories>
    <FeatureProducts></FeatureProducts>
    </>
  )
}
