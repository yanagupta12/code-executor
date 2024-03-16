import React from 'react'

export const CodeContext = React.createContext({})

export const CodeProvider = ({ children }: { children: any }) => {
  const [code, setCode] = React.useState<string>('')
  const [input, setInput] = React.useState<any>()

  return (
    <CodeContext.Provider
      value={{
        code: code,
        setCode: setCode,
        input: input,
        setInput: setInput
      }}
    >
      {children}
    </CodeContext.Provider>
  )
}
