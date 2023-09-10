import { Link } from '@mui/material'
import './Index.scss'
import React from 'react'
import { AuthContext } from '../../context/AuthContext'

const Card = () => {
  const { logout } = React.useContext(AuthContext)
  return (
    <div className="card">
      <Link href="/editor" className="choice" underline="none">
        Use the Editor
      </Link>
      <Link className="choice" underline="none">
        Collaborate
      </Link>
      <Link className="choice" underline="none" onClick={() => logout()}>
        Logout
      </Link>
    </div>
  )
}

export default Card
