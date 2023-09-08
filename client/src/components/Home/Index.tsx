import './Index.scss'
import Signup from '../Signup/Index'
import Login from '../Login/Index'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'


const AuthenticationFormComponent = () => {
  const [showSignup, setShowSignup] = useState<boolean>(true)
  return (
    showSignup ? <Signup setShowSignup={setShowSignup} /> : <Login setShowSignup={setShowSignup} />
  )
}


const Home = () => {
  const { auth } = useContext(AuthContext)


  return (
    <div className="home">
      {auth
        ?
        "You are authenticated"
        :
        <AuthenticationFormComponent />
      }
    </div>
  )
}
export default Home
