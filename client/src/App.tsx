import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import Home from './components/Home'
import Editor from './components/Editor'
import LayoutwithNav from './components/LayoutwithNav'

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
        </Routes>
      </Router>
    </Layout>
  )
}

export default App
