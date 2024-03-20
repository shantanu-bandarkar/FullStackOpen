import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterForm from './components/FilterForm'
import Notification from './components/Notification'
import anecdoteService from './services/anecdoteService'
import { useEffect } from 'react'
import { setAnecdotes } from './reducers/anecdoteReducer'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then((a) => dispatch(setAnecdotes(a)))
  }, [])
  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterForm />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  )
}

export default App
