const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length == 0) {
        return 0
    } else {
        total = 0;
        blogs.forEach((blog) => {
            total += blog.likes
        });
        return total;
    }
}

module.exports = {
    dummy,
    totalLikes
}