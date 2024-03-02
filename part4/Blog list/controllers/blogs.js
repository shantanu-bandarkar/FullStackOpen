const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
    if (blog) {
        response.json(blog)
    }
    else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const user = await User.findById(request.body.userId)
    const blog = new Blog({ ...request.body, user: request.body.userId })
    const newBlog = await blog.save()

    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})


blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        url: body.url,
        likes: Number(body.likes),
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter