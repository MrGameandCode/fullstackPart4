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

blogsRouter.put('/:id', (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(err => response.status(400).json({
            error: err
        }))
})

module.exports = blogsRouter