import React, { useState } from 'react'
import UserContext from './UserContext'
import { Login, Token } from '@mui/icons-material';
import { json } from 'react-router-dom';

const UserState = (props) => {
  let userDetails = JSON.parse(localStorage.getItem('userDetails'))
    const [user, setuser] = useState({
        id: userDetails ? userDetails.id :"",
        Login:userDetails ? true:false,
        Token:userDetails ? userDetails.token:""
    });
  return (
    <UserContext.Provider value={{user,setuser}}> 
        {props.children}
    </UserContext.Provider>
  )
}

export default UserState
