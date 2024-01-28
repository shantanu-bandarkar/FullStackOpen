import React from 'react'

const Message = ({msg, msgColor}) => {
    if (msg === null) {
        return null
      }
    
      return (
        <div className={msgColor === 'green'? 'message': 'message error'} >
          {msg}
        </div>
      )
}

export default Message