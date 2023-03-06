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
        loginUser({email,password})
        setIsLoading(false)
       }
       catch(error){
        setIsLoading(false)
        setError(error)
       }
    
}
    return {login, isLoading, error}
}
