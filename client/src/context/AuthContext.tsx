import React, { createContext, useEffect } from 'react'

export const AuthContext = createContext<any>({})

export const AuthProvider = ({ children }: { children: any }) => {
  const [auth, setAuth] = React.useState<boolean>(false)
  const [userData, setUserData] = React.useState<any>({})

  const login = async (data: object): Promise<void> => {
    setAuth(true)
    window.localStorage.setItem('auth', 'true')
    setUserData(data)
    console.log('Logged in')
  }

  const logout = async (): Promise<void> => {
    setAuth(false)
    window.localStorage.removeItem('auth')
    setUserData({})
  }

  useEffect(() => {
    const auth = window.localStorage.getItem('auth')
    if (auth == 'true') {
      setAuth(true)
    }
  }, [auth])

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
