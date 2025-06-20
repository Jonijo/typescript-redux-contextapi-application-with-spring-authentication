import axios from "axios";
import { type LoaderFunctionArgs } from "react-router-dom";

export const getUsers = async () =>
{
    const API_URL = "https://reqres.in/api/users";

    const {data} = await axios.get(API_URL, {
      headers: {
        'x-api-key': 'reqres-free-v1',
      },
    });

    return data.data
}



export const getUsersById = async ({params} : LoaderFunctionArgs) =>
{
    const API_URL = "https://reqres.in/api/users/"+params.id;
    
    const {data} = await axios.get(API_URL, {
      headers: {
        'x-api-key': 'reqres-free-v1',
      },
    });
    
        return data.data
}

