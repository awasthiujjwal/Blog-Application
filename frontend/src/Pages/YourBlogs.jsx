import React, { useContext, useEffect, useRef, useState } from 'react'
import UserContext from '../context/UserContext';
import { MdDeleteForever } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { Link } from 'react-router-dom';
const YourBlogs = () => {
  const [postId, setPostId] = useState("");
  const [yourpost , setyourpost ] = useState([]);
   const [clicked, setclicked] = useState(false);
  const [image, setimage] = useState("");
  let ctx = useContext(UserContext)
  let id = ctx.user.id;
  let token = ctx.user.token;
  let titleRef = useRef();
  let contentRef = useRef();
  
 async function xyz(){
  let res = await fetch(`https://blog-application-moth.onrender.com/posts/getpost/${id}`,{
    method:"GET",
    headers:{
      'content-type':'application/json',
      "authorization":token
    }
  })
  let data = await res.json()
  console.log(data)
  setyourpost(data.userpost)
 }

useEffect (()=>{
 xyz()
},[])
const handledelete = async (ans)=>{
console.log(ans)
console.log(ans._id)
 let res = await fetch (`https://blog-application-moth.onrender.com/posts/deletepost/${ans._id}`,{
  method:'DELETE'
 })
 let data = await res.json();
 console.log(data)
 xyz()
}
const updatepost =(e)=>{
  let post = e.target.files[0];
  console.log(post)
  setimage(post)
  setclicked(true)
}
const handlesubmit = async(e) => {
  e.preventDefault();
  console.log(image) 
  let reader = new FileReader ()
  if(image){
    reader.readAsDataURL(image);
    reader.onload = async ()=>{
      console.log(reader.result)
      let res = await fetch (`https://blog-application-moth.onrender.com/posts/update/${postId}`,{
       method:"PUT",
       headers:{
        "content-type":"application/json"
       
       },
       body:JSON.stringify ({title:titleRef.current.value,content:contentRef.current.value,image:reader.result})
      })
      let data = await res.json()
      console.log(data)
      xyz()
      setclicked(false)

    }
    reader.onerror =()=>{
      console.log(reader.error)
    }
  }
  else{
    let res = await fetch (`https://blog-application-moth.onrender.com/posts/update/${postId}`,{
      method:"PUT",
      headers:{
       "content-type":"application/json"
      
      },
      body:JSON.stringify ({title:titleRef.current.value,content:contentRef.current.value})
     })
     let data = await res.json()
     console.log(data)
     xyz()
     setclicked(false)
  }

}
const handleEdit = (ans)=>{

  setclicked(true);
  console.log(ans._id)
  setPostId(ans._id)

}

  return (
    <div className='vlog'>
       {yourpost.map((ele)=>{
    return <div key={ele._id} className="card" style={{width: '18rem'}}>
  <img height={'300'} src={ele.image} className="card-img-top" alt="..." />
  
  <div className="card-body">
    <h5 className="card-title">Tiltle:{ele. title}</h5>
    <p className="card-text">author:{ele.author.name}</p>
   
    {/* <Link to={'/ViewDetails'} state={ele} className="btn btn-primary">VIEW DEATILS</Link> */}
    <button className='btn btn-success'>Edit</button>
    <FiEdit2  onClick={()=>handleEdit(ele)} color='green' />
    <MdDeleteForever onClick={()=>handledelete(ele)} size={"30"} color='red' className='deleteicon' />
  </div>
</div>

  })}

 { clicked && <div className='updateform'> 
   <MdClose onClick={()=>setclicked(false)} className='close'/>
   <h1>UPDATE YOUR BLOG</h1>
 
<form action="" className='form'>
  <label htmlFor=""> title</label><br />
  <input ref={titleRef} type="text" name="" id="" /> <br />
  <label htmlFor="">Content</label> <br />
  <textarea ref={contentRef} name="" id=""></textarea> <br />
 <label htmlFor="abc"  className='btn btn-success'>Upload image</label>
 <input type="file" onChange={updatepost} name="" hidden id='abc' />
 {!image && <img height={200}  width={300}src="https://img.freepik.com/premium-vector/illustration-upload_498740-5719.jpg?w=740" alt="" srcset="" />}
 
{image &&<img  height={200}  width={300}src={URL.createObjectURL(image)} alt="" srcset="" />}

  <button onClick={handlesubmit} className='btn btn-info '>Update post</button>
  
  </form> 
  </div>}
    </div>

  )
 
}

export default YourBlogs
