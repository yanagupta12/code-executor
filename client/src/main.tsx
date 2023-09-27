import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/globals.scss'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext.tsx'
import { CodeProvider } from './context/CodeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <CodeProvider>
      <LanguageProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </LanguageProvider>
    </CodeProvider>
  </AuthProvider>
)
