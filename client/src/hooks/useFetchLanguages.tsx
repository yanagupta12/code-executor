import React from 'react'
// import { DEPLOYED_BACKEND_URL } from '../utils/url'

const URL =  "http://51.20.80.125:8000/" + 'code/languages/'

export const useFetchLanguages = () => {
  const [languages, setLanguages] = React.useState({})

  const fetchLanguages = async () => {
    try {
      const response = await fetch(URL)
      const data = await response.json()
      setLanguages(data)
    } catch (err) {
      console.error('An error occurred:', err)
    }
  }

  React.useEffect(() => {
    fetchLanguages()
  }, [])

  return languages
}
