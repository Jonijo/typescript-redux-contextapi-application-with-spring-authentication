import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { resetUser } from '../features/authSlice';
import type { FormEvent } from 'react';

const Header = () => {

  const user = useSelector(state => state.auth.user);

  const navigate = useNavigate();

  
  const dispatch = useDispatch();

  function handleLogout(e : FormEvent)
  {
    e.preventDefault();
    dispatch(resetUser())
    navigate("/login");


  }

  return (
    <div className="ui secondary pointing menu">
    <NavLink to="/home"  className="item">
      Home
    </NavLink>
    <NavLink to="/users"  className="item">
      Users
    </NavLink>
    <div className="right menu">
      <a className="ui item">

        {user && <button onClick={handleLogout}>Logout [{user.email}]</button>}
        {!user && <Navigate to="/login"/>}
      </a>
    </div>
  </div>
  )
}

export default Header