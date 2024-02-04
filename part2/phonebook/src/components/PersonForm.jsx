import React from 'react'

const PersonForm = ({ipName,onNameChange, ipNum, onNumChange, onFormSubmit}) => {
  return (
    <form onSubmit={onFormSubmit}>        
        <div>
          <h3>add a new</h3>
          <label htmlFor="name">name: </label>
          <input
            type="text"
            id="name"
            value={ipName}
            onChange={onNameChange}
          />
        </div>
        <div>
          <label htmlFor="number">number: </label>
          <input
            type='text'
            id="number"
            value={ipNum}
            onChange={onNumChange}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm