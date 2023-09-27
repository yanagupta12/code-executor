import React from 'react'
import { useFetchUserDetails } from '../hooks/useFetchUserDetails'

export const AuthContext = React.createContext<any>({})

export const AuthProvider = ({ children }: { children: any }) => {
  const [auth, setAuth] = React.useState<boolean>(false)
  const [userData, setUserData] = React.useState<any>({})
  const [userEmail, setUserEmail] = React.useState<string>('')

  const login = async (data: any) => {
    console.log(data)
    if (data.email && data.first_name && data.last_name) {
      setAuth(true)
      setUserData(data)
    } else {
      alert('There was a problem')
    }
  }
  let userdata: Object = useFetchUserDetails(userEmail).then(
    (data) => (userdata = data)
  )

  const logout = async () => {
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie =
      'csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    setAuth(false)
    setUserEmail('')
    setUserData({})
  }

  React.useEffect(() => {
    function getCookie(cookieName: string) {
      const name = cookieName + '='
      const decodedCookie = decodeURIComponent(document.cookie)
      const cookieArray = decodedCookie.split(';')

      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i]
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1)
        }
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length)
        }
      }
      return ''
    }
    const email: string = getCookie('user')

    setUserEmail(email)

    if (email) setAuth(true)

    if (userData.email) {
      setAuth(true)
    }

    setUserData(userdata)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        auth: auth,
        userData: userData,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
