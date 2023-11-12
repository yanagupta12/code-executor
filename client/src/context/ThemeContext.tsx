import React from 'react'

export const ThemeContext = React.createContext({})

export const ThemeProvider = ({ children }: { children: any }) => {
  const THEMES: Array<string> = ['dark', 'light']
  

  const [theme, setTheme] = React.useState<string>('dark')


  const toggleTheme = (theme: string) => {
    if (window === undefined) return
    window.localStorage.setItem('theme', theme)
    setTheme(theme)
  }


  return (
    <ThemeContext.Provider
      value={{
        THEMES: THEMES,
        theme: theme,
        setTheme: setTheme,
        toggleTheme: toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
