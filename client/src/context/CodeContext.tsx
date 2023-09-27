import React from 'react'

export const CodeContext = React.createContext({})

export const CodeProvider = ({ children }: { children: any }) => {
  const [code, setCode] = React.useState<string>('')

  return (
    <CodeContext.Provider
      value={{
        code: code,
        setCode: setCode,
      }}
    >
      {children}
    </CodeContext.Provider>
  )
}
