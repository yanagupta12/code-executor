import { Link } from '@mui/material'
import './Index.scss'
import React from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Button } from '@mui/base'

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
      <Button className="choice" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  )
}

export default Card
