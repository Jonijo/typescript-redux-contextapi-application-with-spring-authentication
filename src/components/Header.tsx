import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector,useAppDispatch  } from '../app/hooks'
import type { FormEvent } from 'react';
import { resetUser } from '../features/authSlice';

const Header = () => {

  const user = useAppSelector((state) => state.auth.user);

  const navigate = useNavigate();

  
  const dispatch = useAppDispatch();

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