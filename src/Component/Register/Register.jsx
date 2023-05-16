import React from 'react'
import styles from './Register.module.css'
import * as Yup from 'yup'
import {Formik, useFormik} from 'formik'
import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'


export default function Register() {

  const [isLoading,setIsLoading] = useState(false)
  const [errorMessage,setErrorMessage] = useState(null)
  let navigate = useNavigate()


  function goToLogin(){
    navigate("/login")
    // console.log("gello from register");
  }





    async function register(values){
      console.log("btee5" , values);
      setIsLoading(true)
      setErrorMessage(null)
      let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err) => {
        console.log(err);
      setIsLoading(false)
        setErrorMessage(err.response.data.errors.msg)
      })
      console.log(data);
      if(data.message == "success"){
        setIsLoading(false)
        navigate("/login")
      }
    }

    let mySchema = Yup.object({
      name:Yup.string().required("Name is required").min(3,"min char is 3").max(15,"max char is 15"),
      email:Yup.string().email("invalid email").required("Email is required"),
      password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"invalid password").required("password is required"),
      rePassword:Yup.string().required("Required").oneOf([Yup.ref('password')],"rePassword must be match"),
      phone:Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/,"invalid phone")

    })



  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    validationSchema: mySchema,
    onSubmit:(values)=>register(values)
  })
console.log(formik);

  return (
    <>
      <div className="container my-5">
        <h3>Register Now :</h3>
        {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> : ''}
        <form onSubmit={formik.handleSubmit}>

          <div className="w-75 mx-auto">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" className='form-control mb-3' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          
          
          {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> : ""} 



          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" className='form-control mb-3' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""} 

          

          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password" className='form-control mb-3' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""} 




          <label htmlFor="rePassword">rePassword</label>
          <input type="password" name="rePassword" id="rePassword" className='form-control mb-3' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : ""} 

          
          <label htmlFor="phone">phone</label>
          <input type="tel" name="phone" id="phone" className='form-control mb-3' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : ""} 

            {isLoading ?<button className='btn bg-success text-white'><i className='fa fa-spin fa-spinner'></i></button> :  <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-success text-white'>Register</button>}
            <button onClick={goToLogin}  className='btn bg-danger text-white mx-5'>Already have an account</button>


          </div>


          
        </form>


      </div>

    </>
  )
}
