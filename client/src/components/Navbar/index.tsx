import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './Index.scss'
import { Typography } from '@mui/material'

const Navbar = () => {
  const { userData } = useContext<any>(AuthContext)
  console.log(userData)

  return (
    <div className="navbar">
      <Typography variant="h4" sx={{ flexGrow: 1 }} className='heading'>
        CodeR
      </Typography>
    </div>
  )
}

export default Navbar
