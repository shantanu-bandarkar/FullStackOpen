import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const FilterForm = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(filterChange(event.target.value))
  }
  return (
    <>
      filter
      <input onChange={handleChange} />
    </>
  )
}

export default FilterForm
