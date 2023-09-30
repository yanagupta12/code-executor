import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import Home from './components/Home'
import Editor from './components/Editor'
import LayoutwithNav from './components/LayoutwithNav'
import User from './components/User'

import { AuthContext } from './context/AuthContext'
import { useContext } from 'react'

function App() {
  const { auth } = useContext(AuthContext)

  return (
    <Layout>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LayoutwithNav>
                <Home />
              </LayoutwithNav>
            }
          ></Route>
          <Route path="/editor" element={<Editor />} />
          <Route path='/user/summary' element={<User auth={auth} />} />
        </Routes>
      </Router>
    </Layout>
  )
}

export default App
