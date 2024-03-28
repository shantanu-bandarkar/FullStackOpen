import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        updateBlogLikes(state, action) {
            const blogObj = action.payload
            const newBlogs = state.map(blog => blog.id !== blogObj.id ? blog : blogObj)
            newBlogs.sort((a, b) => b.likes - a.likes)
            return newBlogs
        },
        setBlogs(state, action) {
            const blogs = action.payload
            return blogs.sort((a, b) => b.likes - a.likes)

        },
        deleteBlog(state, action) {
            const id = action.payload.id
            return state.filter(blog => blog.id !== id)
        }
    }
})

export const { appendBlog, setBlogs, updateBlogLikes, deleteBlog } = blogsSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const returnedBlogs = await blogService.getAll()
        dispatch(setBlogs(returnedBlogs))
    }
}

export const addNewBlog = (blog) => {
    return async dispatch => {
        dispatch(appendBlog(blog))
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        dispatch(updateBlogLikes(blog))
    }
}

export const removeBlog = (blog) => {
    return async dispatch => {
        dispatch(deleteBlog(blog))
    }
}

export default blogsSlice.reducer