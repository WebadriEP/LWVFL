import { useEffect, useState } from "react"
import axios from "axios"

/*
 * Custom hook to fetch data from the backend
 * @param {string} url - The url to fetch data from
 * @returns {object} - The data from the backend
 * @example
 * const memberStatsAllTime = useFetch('/api/stats/all-time')
 * console.log(memberStatsAllTime)
 * >> {totalMembers: 1, totalDonations: 1, totalDonationsAmount: 100}
 *
 */
const useApi = (url) => {
  // States can be access wherever hook is used
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Runs when component loads
  useEffect(() => {
    setLoading(true) // Set loading to true before request is made

    axios
      .get(process.env.REACT_APP_BACKEND_URL + url)

      .then((response) => {
        setData(response.data) // Set data to response data
      })

      .catch((error) => {
        setError(error) // Catch errors
      })

      .finally(() => {
        setLoading(false) // Set loading to false after request is made and returned
      })
  }, [url]) // Only run when url changes

  // Return data, error, and loading states as an object
  return { data, error, loading }
}

export default useApi
