import {useState} from 'react'
import { useAuthContext } from './useAuthContext'
import { loginUser } from '../api/axios'
export const useLogin = () =>{

    const [error, setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async(email, password) => {
        setIsLoading(true)
        setError(null)

       try{
        json = loginUser({email,password})
        localStorage.setItem('user', JSON.stringify(json))

        dispatch({type: 'LOGIN', payload:json})

        setIsLoading(false)
       }
       catch{
        setIsLoading(false)
        setError(json.error)
       }
    
}
    return {login, isLoading, error}
}
