import React from 'react'
import { useFetchLanguages } from '../hooks/useFetchLanguages'
export const LanguageContext = React.createContext({})

export const LanguageProvider = ({ children }: { children: any }) => {
  const LANGUAGES: {} = useFetchLanguages()
  const [language, setLanguage] = React.useState<string>('')
  const [languageCode, setLanguageCode] = React.useState<string>('')
  const [response, setResponse] = React.useState<any>({})

  return (
    <LanguageContext.Provider
      value={{
        LANGUAGES: LANGUAGES,
        language: language,
        setLanguage: setLanguage,
        languageCode: languageCode,
        setLanguageCode: setLanguageCode,
        response: response,
        setResponse: setResponse,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
