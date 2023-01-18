const blogsRouter = require('express').Router()

const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    if (!blog.hasOwnProperty('likes')) {
        blog.likes = 0
    }
    if (!blog.hasOwnProperty('title') || !blog.hasOwnProperty('author')) {
        return response.status(400).json({
            error: 'missing important properties title and/or author'
        })
    }
    console.log(blog)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

blogsRouter.delete('/:id', (request, response) => {
    Blog
        .findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
})

module.exports = blogsRouter