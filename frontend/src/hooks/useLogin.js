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

        loginUser({email,password})
    

    if(!response.ok){
        setIsLoading(false)
        localStorage.setItem('user', JSON.stringify(response.json()))
        
        dispatch({type: 'LOGIN', payload: response.json()})

       }
       catch(error){
        console.log("Notworking")
        setIsLoading(false)
        setError(error)
       }
    
}
    return {login, isLoading, error}
}
