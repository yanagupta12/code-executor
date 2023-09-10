import { Link } from '@mui/material'
import './Index.scss'

const Card = () => {
  return (
    <div className="card">
      <Link
        href="/editor"
        className="choice"
      >
        Use the Editor
      </Link>

      <Link className="choice">Collaborate</Link>
      <Link className="choice">Logout</Link>
    </div>
  )
}

export default Card
