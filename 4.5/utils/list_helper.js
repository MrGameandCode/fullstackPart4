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
    const blog = blogs.reduce((prev,current) =>{
        return (prev.likes > current.likes) ? prev : current
    })
    return blog
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}