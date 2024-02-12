const helper = require('lodash')

const dummy = (blogs) => {
    return 1;
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
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}