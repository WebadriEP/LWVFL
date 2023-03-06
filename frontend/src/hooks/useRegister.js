import {useState} from 'react'
import {useAuthContext} from './useAuthContext'
import { registerUser } from '../api/axios'

export const useRegister = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { dispatch } = useAuthContext()
  
    const register = async (firstName, lastName, email, password, address, city, phone) => {
      setLoading(true)
      setError(null)
  
      json = registerUser({ firstName, lastName, email, password, address, city, phone })
        
      if (!response.ok) {
        setLoading(false)
      }
      catch(error){
        setLoading(false)
        setError(error)
      }
      
    }
  
    return { register, error, loading }
  }
