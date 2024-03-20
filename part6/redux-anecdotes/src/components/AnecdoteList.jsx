import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { setNoti, removeNoti } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(updateVote(anecdote))
    dispatch(setNoti(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(removeNoti())
    }, 2000)
  }
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter((anecdote) => {
      const anec = anecdote.content.toLowerCase()
      if (typeof filter === 'string') {
        const fil = filter.toLowerCase()
        return anec.includes(fil)
      } else {
        return anecdotes
      }
    })
  })

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <Anecdote anecdote={anecdote} />
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
