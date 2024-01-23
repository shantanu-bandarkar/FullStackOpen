import React from 'react'

const Button = ({children,onClk}) => {
  return (
    <button onClick={onClk}>{children}</button>
  )
}

export default Button