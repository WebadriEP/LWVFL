import {useState} from 'react'
import { useAuthContext } from './useAuthContext'
import { loginUser } from '../api/axios'
export const useLogin = () =>{

    const [error, setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)

    const login = async(email, password) => {
        setIsLoading(true)
        setError(null)

       try{
        response = loginUser({email,password})
        setIsLoading(false)
        localStorage.setItem('user', JSON.stringify(response.JSON))
        dispatch({type: 'LOGIN', payload: response.JSON})

       }
       catch(error){
        setIsLoading(false)
        setError(error)
       }
    
}
    return {login, isLoading, error}
}
