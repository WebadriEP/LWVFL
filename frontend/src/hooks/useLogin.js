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

       json = loginUser({email,password})
    

    if(!response.ok){
        setIsLoading(false)
        setError(json.error)
    }
    if(response.ok){
        localStorage.setItem('user', JSON.stringify(json))

        dispatch({type: 'LOGIN', payload:json})

        setIsLoading(false)
    }
}
    return {login, isLoading, error}
}
