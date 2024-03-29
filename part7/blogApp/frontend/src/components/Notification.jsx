import './notification.css'
import { useSelector } from 'react-redux'

// const Notification = ({ message, type }) => {
const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const type = useSelector((state) => state.notification.type)
  if (notification.content === null) {
    return null
  }

  return <div className={`alert alert-${type}`}>{notification.content}</div>
}
export default Notification
