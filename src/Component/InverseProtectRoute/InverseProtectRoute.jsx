import React from 'react'
import styles from './InverseProtectRoute.module.css'
import { Navigate } from 'react-router-dom'

export default function InverseProtectRoute(props) {
  if (localStorage.getItem("userToken")) {
    return <Navigate to='/home'/>
  }else{return props.children}

}
