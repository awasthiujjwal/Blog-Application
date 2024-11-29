
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdClose } from "react-icons/md";
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';


const Home = () => {
   let ctx = useContext (UserContext)
   console.log(ctx.user.id)
  const [clicked, setclicked] = useState(false);
  const [posts,setposts] = useState ([ ])
  let titleref = useRef()
  let descriptionref = useRef ()
const fetchAllposts = async ()=>{
    
    let res = await fetch ('https://blog-application-moth.onrender.com/posts/allpost');
    let data = await res.json();
    console.log(data.posts)
    setposts(data.posts)
  }
  useEffect(()=>{
    fetchAllposts()
  },[])
  const [image, setimage] = useState(false);
   const handlepost = (e)=>{
    console.log(e.target.files[0])
    setimage(e.target.files[0])
    
 
   }
   const handlesubmit=(e)=>{
    e.preventDefault ()
    console.log("running")
    let reader =new FileReader()
    reader.readAsDataURL(image)


    reader.onload =async()=>{
    console.log(reader.result)
    console.log(titleref.current.value)
    console.log(descriptionref.current.value)
    console.log(ctx.user.id)
    let res = await fetch('https://blog-application-moth.onrender.com/posts/create',{
      method:"POST",
      headers:{
        'content-type':"application/json"
      },
      body:JSON.stringify ({title:titleref.current.value, content:descriptionref.current.value,image:reader.result,author:ctx.user.id})
    })
    let data = await  res.json();
    console.log (data) 
    setclicked(false)
    fetchAllposts()
    setimage("")
  
  }
}
// const handledetails = (ans) =>{
//   console.log(ans)
// }
  return (
   <div className='row'>
    <div className='col-2 bg-warning'>
      <button style={{ width:"200px"}}  onClick={()=>setclicked(true)} className='btn btn-success' >CREATE BLOG</button>
    </div>
    <div className='col-10 bg-danger'>
    <div className='row'>
 
{posts.map((ele)=>{
  return <div className="card" style={{width: '18rem'}}>
<img height={'300'} src={ele.image} className="card-img-top" alt="..." />
<div className="card-body">
  <h5 className="card-title">Title:{ele. title}</h5>
  <p className="card-text">Author:{ele.author.name}</p>
  <Link to={'/ViewDetails'} className="btn btn-primary" state={ele}  > View Details</Link>
</div>
</div>

})}
</div>
    </div>
    {clicked && <div className='form1'>
    <MdClose  onClick={()=>setclicked(false)} size={'30px'} className='close' />
    <form action=""  > <h1>SHARE YOUR BLOG</h1> <br />
   
      <label  htmlFor="">Title</label> <br />
      <input ref={titleref} style={{width:"100%"}} type="text" /><br />
      <label  htmlFor="">Description</label><br />
      <textarea ref={descriptionref}  style={{width:"100%"}}name="" id=""></textarea> <br />
      <label className='btn btn-success' htmlFor="abc">upload image</label> <br />
      <input onChange={handlepost} hidden type="file" name="" id="abc" />
      {image && <img style={{margin:"20px auto"}} height={200} width={300} className='pic' src={URL.createObjectURL(image)} alt="" />} <br />
      {!image && <img style={{margin:"20px auto"}} height={200} width={300} src="https://repository-images.githubusercontent.com/229240000/2b1bba00-eae1-11ea-8b31-ea57fe8a3f95" alt="" />} <br />
      <button onClick={handlesubmit} className='btn btn-danger'>submit</button>
    </form>
    </div>}
   </div>
    
  )
}

export default Home

