import React from 'react'

const Filter = ({search, onChange}) => {
  return (
    <div>
          <label htmlFor="search">search: </label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={onChange}
          />
        </div>
  )
}

export default Filter