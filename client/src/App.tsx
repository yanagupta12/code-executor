import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Editor from './components/Editor'
import LayoutwithNav from './components/LayoutwithNav'
import User from './components/User'
import Dashboard from './components/Dashboard'
import Room from './components/CollaborativeEditor'

function App() {
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

          <Route
            path="/user/summary"
            element={
              <LayoutwithNav>
                <User />
              </LayoutwithNav>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <LayoutwithNav>
                <Dashboard />
              </LayoutwithNav>
            }
          />
          <Route path="/room/:room_id" element={<Room />} />
        </Routes>
      </Router>
    </Layout>
  )
}

export default App
