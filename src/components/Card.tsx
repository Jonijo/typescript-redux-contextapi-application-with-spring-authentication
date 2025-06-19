
import { useNavigate } from 'react-router-dom'

type CardProps ={
    id : number,
    email : string,
    avatar : string
}
const Card = ({id,email,avatar} : CardProps) => {

  const navigate = useNavigate();

  return (
    <>
    <div onClick={()=>navigate(`/user/${id}`)}>
      <div>Card for {email}</div>

      <img src={avatar}/>
    </div>
    </>
    
  )
}

export default Card