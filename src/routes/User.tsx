import { useLoaderData } from 'react-router-dom'

const User = () => {

  const {email,avatar} = useLoaderData() as {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };

 

  return (
    <div className="ui segment">
    <p>User : {email}</p>
    <img src={avatar}/>
  </div>
  )
}

export default User