import React from 'react'
import { useFetchUserDetails } from '../hooks/useFetchUserDetails'
export const AuthContext = React.createContext<any>({})

export const AuthProvider = ({ children }: { children: any }) => {
  const [auth, setAuth] = React.useState<boolean>(false)
  const [userEmail, setUserEmail] = React.useState<string>('')
  const [userData, setUserData] = React.useState<Object>({})

  const login = async (data: any) => {
    if (data.email && data.first_name && data.last_name) {
      setUserData(data)
      setAuth(true);
    } else {
      alert('There was a problem');
    }
  }
  useFetchUserDetails(userEmail).then(res => {
    setUserData(res)
  })

  const logout = () => {
    setAuth(false)
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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

    if (email) setAuth(true);

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
