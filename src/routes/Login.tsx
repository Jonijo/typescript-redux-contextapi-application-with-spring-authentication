import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
import { Form, useNavigate } from 'react-router-dom';


const Login = () => {

  const [username,setUserName] = useState("");
  const [email,setEmail] = useState("");


  const dispatch = useDispatch();

  const navigate = useNavigate();



  function handleSubmit(e)
  {
    e.preventDefault();

    dispatch(setUser({username,email}))

    setUserName("");
    setEmail("");

    navigate("/home");
  }
  return (

    <>
    <div className="ui segment">
    <p>Login</p>
    </div>

    <form onSubmit={handleSubmit} >

    <input type="text" value={username} onChange={(e)=>{setUserName(e.target.value)}}/><br/><br/>
    <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/><br/><br/>
    <button type="submit" name="submit">Login</button>
    </form>

  </>

  )
}

export default Login