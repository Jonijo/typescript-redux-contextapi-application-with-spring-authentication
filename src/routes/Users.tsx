import { useEffect } from 'react'
import { fetchUsersList, resetUsersList } from '../features/usersSlice';
import Loading from '../components/Loading';
import Card from '../components/Card';
import { useAppSelector, useAppDispatch } from '../app/hooks'

const Users = () => {


  const usersList = useAppSelector((state) => state.users.usersList)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsersList())
  
    return () => {
      dispatch(resetUsersList());
    }
  }, [dispatch])
  

  const users = useAppSelector((state) => state.users.usersList)
  const loading = useAppSelector((state) => state.users.loading)
  const error = useAppSelector((state) => state.users.error)


  console.log(usersList);
  console.log(loading);

  


  return (
    
    <>
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