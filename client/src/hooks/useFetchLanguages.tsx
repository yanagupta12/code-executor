import React from 'react'

// const URL = "http://localhost:8000/code/languages/";

export const useFetchLanguages = () => {
  const [languages, setLanguages] = React.useState([])

  const fetchLanguages = async () => {
    try {
      const response = await fetch('http://localhost:8000/code/languages/')
      console.log(response)
    } catch (err) {
      console.error('An error occurred:', err)
    }
  }

  React.useEffect(() => {
    fetchLanguages()
  }, [])

  return languages
}
