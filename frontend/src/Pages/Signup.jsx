import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  let name = useRef();
  let email = useRef();
  let password = useRef();
  let address= useRef ();
  let navigate = useNavigate();

  const handleSignup = async (e)=>{
    e.preventDefault();
    let obj ={
      name:name.current.value,
      email:email.current.value,
      password:password.current.value,
      address:address.current.value
    }
    console.log(obj)
    let res = await fetch('http://localhost:8080/users/register',{
      method: 'POST',
      headers: {
        'content-type' : 'application/json'

      },
      body : JSON.stringify(obj)
    })
    let data = await res.json()
    console.log(data)
    if(data.success){
      navigate ('/login')
    }
    else{
      alert(data.msg)
    }
  }
  return (
    <div>
        <form className='col-md-6 m-auto mt-4' >
  <div className="mb-3">
  <label htmlFor="">Name</label><br />
  <input type="text" ref={name} className="form-control" /> <br />
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" ref={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div><br />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label><br />
    <input type="password" ref={password} className="form-control" id="exampleInputPassword1" />
    <label htmlFor="">Address</label><br />
   <textarea ref={address} className='form-control'></textarea>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button onClick={handleSignup} type="submit" className="btn btn-primary">Submit</button>

</form>
<p className='para'>Already have an account?<Link to={'/login'}>Login</Link></p>

         

      
    </div>
  )
}

export default Signup
