const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length == 0) {
        return 0
    } else {
        total = 0
        blogs.forEach((blog) => {
            total += blog.likes
        })
        return total
    }
}

const favoriteBlog = (blogs) => {
    const blog = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })
    return blog
}

const mostBlogs = (blogs) => {
    authors = []
    blogs.forEach((blog) => {
        if (authors.filter((author) => author.author == blog.author).length > 0) {
            authors[authors.findIndex(result => result.author == blog.author)].blogs += 1;
        } else {
            const result = {
                author: blog.author,
                blogs: 1
            }
            authors.push(result)
        }
    })
    author = authors.reduce((prev, current) => {
        return (prev.blogs > current.blogs) ? prev : current
    })
    return author
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}