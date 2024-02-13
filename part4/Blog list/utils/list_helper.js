const helper = require('lodash')
const Blog = require('../models/blog')
const initialBlogs = [
    {
        id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    },
    {
        id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    }
]

const dummy = (blogs) => {
    return 1;
}
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const totalLikes = (blogs) => {
    const likes = blogs.reduce((sum, blog) => {
        return sum + blog['likes']
    }, 0)
    return likes
}
// const favoriteBlog = (blogs) => {
//     const likes = blogs.map((blog) => blog.likes);
//     const sortedLikes = [...likes].sort((a, b) => b - a);
//     const mostLiked = sortedLikes[0];
//     const ans = blogs.find((blog) => blog.likes === mostLiked);
//     return { title: ans.title, author: ans.author, likes: ans.likes };
// };

const favoriteBlog = (blogs) => {
    const mostLiked = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current);
    return { title: mostLiked.title, author: mostLiked.author, likes: mostLiked.likes };
};

const mostBlogs = (blogs) => {
    const authorCounts = helper.countBy(blogs, 'author')
    const topAuthor = helper.maxBy(helper.keys(authorCounts), (author) => authorCounts[author])

    return { author: topAuthor, blogs: authorCounts[topAuthor] }
}

const mostLikes = (blogs) => {
    const likesPerAuthor = {};

    blogs.forEach((blog) => likesPerAuthor[blog.author] = (likesPerAuthor[blog.author] || 0) + blog.likes);

    let mostLikedAuthor = '';
    let mostLikesCount = 0;

    for (const author in likesPerAuthor) {
        if (likesPerAuthor[author] > mostLikesCount) {
            mostLikedAuthor = author;
            mostLikesCount = likesPerAuthor[author];
        }
    }

    return {
        author: mostLikedAuthor,
        likes: mostLikesCount,
    };
};

module.exports = {
    initialBlogs,
    blogsInDb,
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}