const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
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

blogsRouter.post('/', middleware.userExtracter, middleware.tokenExtracter, async (request, response, next) => {
    const user = request.user
    const blog = new Blog({ ...request.body, user: request.user.id })
    const newBlog = await blog.save()
    // console.log('post blog result', newBlog);
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()

    const res = await newBlog.populate('user', { username: 1, name: 1 })

    response.status(201).json(res)
})

blogsRouter.delete('/:id', middleware.userExtracter, async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    // console.log('blog', blog);
    const user = request.user
    // console.log('user from backend', user.id);
    // console.log('user from blog', blog.user);
    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }
    else {
        response.status(401).json({ error: "only user can delete the blog" })
    }
})


blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        url: body.url,
        likes: Number(body.likes),
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1 })

    response.json(updatedBlog)
})

module.exports = blogsRouter