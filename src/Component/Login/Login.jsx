import React from 'react'
import styles from './Login.module.css'
import * as Yup from 'yup'
import {Formik, useFormik} from 'formik'
import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'


export default function Login({saveUser}) {


  const [isLoading,setIsLoading] = useState(false)
  const [errorMessage,setErrorMessage] = useState(null)
  let navigate = useNavigate()

      function goBack(){
        navigate("/register")
        // console.log("gello from goback");
      }

    async function login(values){
      console.log("btee5" , values);
      setIsLoading(true)
      setErrorMessage(null)
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch((err) => {
        console.log(err);
      setIsLoading(false)
        setErrorMessage(err.response.data.message)
      })
      console.log(data);
      if(data.message == "success"){
        setIsLoading(false)
        localStorage.setItem("userToken" , data.token)
        saveUser()
        navigate("/")
      }
    }

    let mySchema = Yup.object({
      email:Yup.string().email("invalid email").required("Email is required"),
      password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"invalid password").required("password is required"),

    })



  let formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema: mySchema,
    onSubmit:(values)=>login(values)
  })

  return (
    <>
    <div className="container my-5">
      <h3>Login Now :</h3>
      {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> : ''}
      <form className="w-75 mx-auto" onSubmit={formik.handleSubmit}>

      



        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" className='form-control mb-3' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""} 

        

        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" className='form-control mb-3' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""} 





        

          {isLoading ?<button className='btn bg-success text-white'><i className='fa fa-spin fa-spinner'></i></button> :  <button className='btn bg-success text-white'>Login</button>}
          <button onClick={goBack} className='btn bg-danger text-white mx-5'>Don't have an account yet?  Sign Up</button>
          


        
        
      </form>


    </div>

  </>
  )
}
