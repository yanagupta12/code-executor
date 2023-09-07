import React, { createContext } from 'react'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }: { children: any }) => {
  const [auth, setAuth] = React.useState<boolean>(false)

  const toggleAuth = (auth: boolean) => {
    setAuth(!auth)
  }

  return (
    <AuthContext.Provider
      value={{ auth: auth, setAuth: setAuth, toggleAuth: toggleAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}
