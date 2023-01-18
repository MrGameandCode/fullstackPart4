const jwt = require('jsonwebtoken')
const blog = require('../models/blog')
const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .populate('user')
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', async (request, response) => {
    const token = request.token
    if (token == null) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }
    const blog = new Blog(request.body)
    if (!request.body.hasOwnProperty('likes')) {
        blog.likes = 0
    }
    if (!request.body.hasOwnProperty('title') || !request.body.hasOwnProperty('author')) {
        return response.status(400).json({
            error: 'missing important properties title and/or author'
        })
    }
    if (!request.body.hasOwnProperty('user')) {
        blog.user = await User.findOne({});
    } else {
        blog.user = await User.findById(request.body.user);
    }
    console.log(blog)
    const savedblog = await blog.save()
    const user = await User.findById(blog.user.id)
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    return response.status(201).json(savedblog).end()
})

blogsRouter.delete('/:id', async (request, response) => {
    const token = request.token
    if (token == null) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }
    const blogRequested = await blog.findById(request.params.id)
    if (blogRequested.user.toString() == decodedToken.id) {
        Blog
            .findByIdAndDelete(request.params.id)
            .then(result => {
                response.status(204).end()
            })
    } else {
        response.status(403).end()
    }
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