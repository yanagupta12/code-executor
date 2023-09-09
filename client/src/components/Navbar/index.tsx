import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
  const { userData } = useContext<any>(AuthContext)

  return <nav>This the navbar</nav>
}

export default Navbar
