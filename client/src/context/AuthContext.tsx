import React from 'react'
export const AuthContext = React.createContext<any>({})

export const AuthProvider = ({ children }: { children: any }) => {
  const [auth, setAuth] = React.useState<boolean>(false)
  const [userEmail, setUserEmail] = React.useState<string>('')
  const [userData, setUserData] = React.useState<Object>({})

  const login = async (data: any) => {
    if (data.email && data.first_name && data.last_name) {
      setUserData(data);
      window.localStorage.setItem('user', JSON.stringify(data))
      setAuth(true);
    } else {
      alert('There was a problem');
    }
  }


  const logout = () => {
    setAuth(false)
    window.localStorage.removeItem("user")
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

    function getUser() {
      const user = window.localStorage.getItem('user');
      user ? setUserData(JSON.parse(user)) : null;
    }
    getUser();

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
        userEmail: userEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
