import { NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector,useAppDispatch  } from '../app/hooks'
import type { FormEvent } from 'react';
import { logout } from '../features/authSlice';
import ToggleTheme from './ToggleTheme';

const Header = () => {

  const user = useAppSelector((state) => state.auth.username);

  console.log("user is set as" + user);

  const navigate = useNavigate();

  
  const dispatch = useAppDispatch();

  function handleLogout(e : FormEvent)
  {
    e.preventDefault();
    dispatch(logout())
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

        {user && <button onClick={handleLogout}>Logout [{user}]</button>}

        <ToggleTheme/>
        
      </a>
    </div>
  </div>
  )
}

export default Header