const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(result => {
        response.json(result)
    })
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id).then(result => {
        if (result) {
            response.json(result)
        }
        else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    blog.save()
        .then(result => {
            response.status(201).json(result)
        }).catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id).then(() => response.status(204).end()).catch(error => nexr(error))
})


blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const blog = {
        url: body.url,
        likes: Number(body.likes),
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedblog => {
            response.json(updatedblog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter