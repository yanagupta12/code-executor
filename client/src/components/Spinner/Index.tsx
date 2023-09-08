import { FC } from 'react'
import './Index.scss'

interface Props {
  text?: string
  small?: boolean
}

const Spinner: FC<Props> = ({ text, small }) => (
  <div className={`"container" ${small ? 'small' : ''}`}>
    <div className={'loader'} />
    {text && small ? <h4>{text}</h4> : <h3>{text}</h3>}
  </div>
)

export default Spinner
