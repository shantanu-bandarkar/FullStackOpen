import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import {
  clearNotification,
  setNotification,
  useNotificationDispatch,
} from './components/NotificationContext'
const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updateAnec) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdote = anecdotes
        .map((a) => (a.id !== updateAnec.id ? a : updateAnec))
        .sort((a, b) => b.votes - a.votes)
      queryClient.setQueryData(['anecdotes'], updatedAnecdote)

      dispatch(setNotification(`anecdote ${updateAnec.content} voted`))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    },
  })

  const handleVote = (anecdote) => {
    // console.log('vote')
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 2,
  })

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <span>anecdote service not available due to problems in server</span>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
