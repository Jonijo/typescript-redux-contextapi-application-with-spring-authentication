import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { fetchData, resetState } from '../features/usersSlice';
import Loading from '../components/Loading';
import Card from '../components/Card';

const Users = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData())
  
    return () => {
      dispatch(resetState());
    }
  }, [dispatch])
  
  const user = useSelector((state)=>state.auth.user);

  const users = useSelector((state)=>state.users.usersList);

  const loading = useSelector((state)=>state.users.loading);
  const error = useSelector((state)=>state.users.error);


  console.log(users);
  console.log(loading);

  


  return (
    
    <>
    {!user && <Navigate to="/login"/>}
    <div className="ui segment">

    { loading && <Loading/> }

    {error && <>Error : {error}</>}

    {!loading && 
      <div>
        {users.map((user)=>{
          return(
            <Card key={user.id} {...user}/>
          )
        })}
      </div>
    }

      

    <p>Users</p>
    </div>
  </>
  )
}

export default Users