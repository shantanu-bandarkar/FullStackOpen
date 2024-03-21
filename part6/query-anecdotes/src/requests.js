import axios from "axios";
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
}

export const createAnecdote = async (newAnec) => {
    const res = await axios.post(baseUrl, newAnec);
    return res.data;
}

export const voteAnecdote = async (anec) => {
    const res = await axios.put(`${baseUrl}/${anec.id}`, anec)
    return res.data
}