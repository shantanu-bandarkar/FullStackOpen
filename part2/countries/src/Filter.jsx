import React from 'react'

const Filter = ({input, onChange}) => {
  return (
    <form>
        filter countries:<input type="text" value={input} onChange={onChange} />
      </form>
  )
}

export default Filter