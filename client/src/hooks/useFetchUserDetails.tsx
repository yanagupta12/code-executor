import React from "react";


export const useFetchUserDetails = async (email: string) => {
    const [userDetails, setUserDetails] = React.useState({})

    React.useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/auth/get?email=${email}`, {
                    method: 'GET',
                    credentials: 'include',
                })
                const data = await response.json()
                setUserDetails(data)
            } catch (err) {
                console.error('An error occurred:', err)
            }
        }
        fetchUserDetails()
    }, [email])

    return userDetails
}