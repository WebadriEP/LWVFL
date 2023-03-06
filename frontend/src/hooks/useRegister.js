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
      try{
        json = registerUser({ firstName, lastName, email, password, address, city, phone })
        setLoading(false)
      }
      catch{
        setLoading(false)
        setError(json.error)
      }
      
    }
  
    return { register, error, loading }
  }
