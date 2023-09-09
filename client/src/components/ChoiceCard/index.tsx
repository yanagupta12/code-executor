import './Index.scss'

const Card = () => {
  return (
    <div className="card">
      <button
        // onClick={}
        className="choice"
      >
        Use the Editor
      </button>
      <button className="choice">Collaborate</button>
      <button className="choice">Logout</button>
    </div>
  )
}

export default Card
