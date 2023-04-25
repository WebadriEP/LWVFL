import {useState} from 'react'
import {useAuthContext} from './useAuthContext'

export const useRegister = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { dispatch } = useAuthContext()
  
    const register = async (firstName, lastName, email, password, address, city, phone, admin) => {
      setLoading(true)
      setError(null)
  
      const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, lastName, email, password, address, city, phone, admin })
      })
  
      const json = await response.json()
  
      if (!response.ok) {
        setLoading(false)
        setError(json.error)
      }
  
      if (response.ok) {
        //dispatch({ type: 'CREATE_USER', payload: json })
        setLoading(false)
      }
    }
  
    return { register, error, loading }
  }
