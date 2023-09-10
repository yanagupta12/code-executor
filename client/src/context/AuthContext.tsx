import React, { createContext, useEffect } from 'react'
import { useFetchUserDetails } from '../hooks/useFetchUserDetails'

export const AuthContext = createContext<any>({})

export const AuthProvider = ({ children }: { children: any }) => {
  const [auth, setAuth] = React.useState<boolean>(false)
  const [userData, setUserData] = React.useState<any>({})
  const [userEmail, setUserEmail] = React.useState<string>("")

  const login = async (data: any) => {
    if (userData) {
      setAuth(true)
      window.localStorage.setItem("auth", "true")
    }
  }


  useEffect(() => {
    function getCookie(cookieName: string) {
      const name = cookieName + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(';');

      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
        }
      }
      return "";
    }
    setUserEmail(getCookie("user"))
    if (userEmail !== "") { window.localStorage.setItem("auth", "true") }
    if (window.localStorage.getItem("auth") === "true") { setAuth(true) }

  }, [auth])

  const fetchUserDetails = async () => {
    useFetchUserDetails(userEmail).then((data) => setUserData(data))
  }
  fetchUserDetails()


  return (
    <AuthContext.Provider
      value={{
        auth: auth,
        userData: userData,
        login: login,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
