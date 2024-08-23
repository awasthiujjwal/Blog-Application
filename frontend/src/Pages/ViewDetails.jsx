import React from 'react'
import { useLocation } from 'react-router-dom'

const ViewDetails = () => {
    
    let location = useLocation()
    console.log(location.state)
   
  return (
  
      <div className='text-center'> <marquee scrollamount='20' behavior="alternate" direction="left"><h1><b>Blog Details </b></h1></marquee> 
        <div className='details'>
        <div className="card mt-5 mb-5" style={{width: '18rem'}}>
  <img src={location.state.image} className="card-img-top " alt="..." />
  <div className="card-body">
    <h5 className="card-title"><b>Title:</b>{location.state.title}</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
   
  </div>

</div>

<div className='comments'>
     <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla nisi perspiciatis saepe blanditiis sunt sint officiis culpa nesciunt recusandae voluptates, ipsa facere aliquid! Ratione unde, molestias, eaque provident cumque eos esse, aut beatae quasi facilis quia animi totam officiis excepturi commodi perspiciatis expedita! Ipsam dolorem doloribus impedit natus iusto asperiores?</p>
 </div>

 </div>
    </div>
  )
}

export default ViewDetails
