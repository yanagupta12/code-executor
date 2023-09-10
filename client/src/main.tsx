import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/globals.scss'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <LanguageProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </LanguageProvider>
  </AuthProvider>
)
