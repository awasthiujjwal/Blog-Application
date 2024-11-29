import React, { useContext, useRef } from 'react'

import {  Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import UserContext from '../context/UserContext';


const Login = () => {
   let ctx = useContext(UserContext)
   console.log(ctx)
  let emailref = useRef();
  let passwordRef = useRef();

 let navigate= useNavigate();
  const handlesubmit=async (e)=>{
    e.preventDefault();
    let obj ={
      email:emailref.current.value,
      password:passwordRef.current.value
    }
    console.log(obj)
    let res = await fetch('https://blog-application-moth.onrender.com/users/login',{
      method: 'POST',
      headers: {
        'content-type' : 'application/json'

      },
      body : JSON.stringify(obj)
    })
    let data = await res.json()
    console.log(data)
    if(data.success){
      toast.success(data.msg,{position:"top-center"});
      localStorage.setItem('userDetails',JSON.stringify({login:true,token:data.token,id:data.id}))
      ctx.setuser ({Login:true,Token:data.token,id:data.id})
      navigate ('/')
    }
    else{
      toast.error(data.msg,{position:'top-center'})

    }
  }
  
  return (
    
    <div>
        <form className='col-md-6 m-auto mt-4'>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" ref={emailref} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" ref={passwordRef} className="form-control" id="exampleInputPassword1" />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button onClick={handlesubmit} type="submit" className="btn btn-primary">Submit</button>
  
</form>
<p className='para'>Signup to?<Link to={'/signup'}> login</Link></p>
<p className='para'><Link to={'/ForgetPassword'}>Forget Password ?</Link></p>


     
    </div>
  )
}

export default Login
