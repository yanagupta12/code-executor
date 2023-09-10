import React from 'react'
import { useFetchLanguages } from '../hooks/useFetchLanguages'
export const LanguageContext = React.createContext({})

export const LanguageProvider = ({ children }: { children: any }) => {
  const LANGUAGES: {} = useFetchLanguages()
  const [language, setLanguage] = React.useState<string>('')

  return (
    <LanguageContext.Provider
      value={{
        LANGUAGES: LANGUAGES,
        language: language,
        setLanguage: setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
