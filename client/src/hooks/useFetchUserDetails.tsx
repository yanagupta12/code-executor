import React from 'react'
import { DEPLOYED_BACKEND_URL } from '../utils/url'

const URL = DEPLOYED_BACKEND_URL +  '/auth/get?email='

export const useFetchUserDetails = async (email: string) => {
  const [userDetails, setUserDetails] = React.useState({})

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(URL + email, {
          method: 'GET',
          credentials: 'include',
        })
        const data = await response.json()
        setUserDetails(data)
      } catch (err) {
        console.error('An error occurred:', err)
      }
    }

    if (email) {
      fetchUserDetails()
    }
  }, [email])

  return userDetails
}
