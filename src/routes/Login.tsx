import { useState, type FormEvent } from 'react'
import { setUser } from '../features/authSlice';
import {  useNavigate } from 'react-router-dom';
import {  useAppDispatch } from '../app/hooks'


const Login = () => {

  const [username,setUserName] = useState("");
  const [email,setEmail] = useState("");


   const dispatch = useAppDispatch()

  const navigate = useNavigate();



  function handleSubmit(e : FormEvent)
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