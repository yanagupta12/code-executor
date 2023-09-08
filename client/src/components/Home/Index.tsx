import './Index.scss'
import Signup from '../Signup/Index'
import Login from '../Login/Index'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Card from '../ChoiceCard/Index'

const AuthenticationFormComponent = () => {
  const [showSignup, setShowSignup] = useState<boolean>(true)
  return showSignup ? (
    <Signup setShowSignup={setShowSignup} />
  ) : (
    <Login setShowSignup={setShowSignup} />
  )
}

const Home = () => {
  const { auth } = useContext(AuthContext)

  return (
    <div className="home">
      <div className="h-1 com">
        <h1 className="heading">
          Code
          <span className="striped-text">R</span>
        </h1>
      </div>
      <div className="h-2 com">
        {auth ? <Card /> : <AuthenticationFormComponent />}
      </div>
    </div>
  )
}
export default Home
