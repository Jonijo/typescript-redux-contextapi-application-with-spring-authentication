import { useState, type FormEvent } from 'react'
import {  useNavigate } from 'react-router-dom';
import {  useAppDispatch } from '../app/hooks'
import { selectIsAuthenticated } from '../features/authSlice';
import { useAppSelector } from '../app/hooks';
import { useEffect } from 'react';
import { login } from '../features/authSlice';
import { useLocation } from 'react-router-dom';

const Login = () => {

  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");


   const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'


  function handleSubmit(e : FormEvent)
  {
    e.preventDefault();
    dispatch(login({username,password}))
    navigate(from); 
  }

    useEffect(() => {
    if (isAuthenticated) {
      navigate('/home'); // 👈 redirect to home
    }
    else
    {
      navigate('/login');
    }
  }, [isAuthenticated,navigate]);

  return (

    <>
    <div className="ui segment">
    <p>Login</p>
    </div>

    <form onSubmit={handleSubmit} >

    <input type="text" value={username} onChange={(e)=>{setUserName(e.target.value)}}/><br/><br/>
    <input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br/><br/>
    <button type="submit" name="submit">Login</button>
    </form>

  </>

  )
}

export default Login