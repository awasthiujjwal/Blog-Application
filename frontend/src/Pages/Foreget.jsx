import React from 'react'
 

const handlesubmit = (ans) => {
    console.log(ans)
}
const Foreget = () => {
  return (
    
    <div>
        <h1>CREATE YOUR NEW PASSWORD</h1>
      <form action="">EMAIL</form> <br />
      <input type="email" /> <br />
      <button onClick={handlesubmit} className='btn btn-info mt-3 '>Submit</button>
    </div>
    
  )
}

export default Foreget
