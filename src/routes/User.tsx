import { useLoaderData } from 'react-router-dom'

const User = () => {

  const {email,avatar} = useLoaderData();

 

  return (
    <div className="ui segment">
    <p>User : {email}</p>
    <img src={avatar}/>
  </div>
  )
}

export default User