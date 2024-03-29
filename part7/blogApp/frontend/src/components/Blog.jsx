import { useState } from 'react'

const Blog = ({ blog, handleUpdate, handleRemove, handleComment }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  if (!blog) return null
  const [comment, setComment] = useState('')

  const handleUpdateLike = () => {
    return handleUpdate({ ...blog, likes: blog.likes + 1 })
  }

  const removeBlog = () => handleRemove(blog)

  const details = () => {
    return (
      <>
        <a href={blog.url} target='__blank'>
          {blog.url}
        </a>
        <div>
          <span>likes {blog.likes}</span>
          <button id='like-button' onClick={handleUpdateLike}>
            like
          </button>
        </div>
        <p>added by {blog.user.username}</p>
        <button onClick={removeBlog}>remove</button>
      </>
    )
  }

  return (
    <div className='container' style={blogStyle}>
      <h2>
        {blog.title} {blog.author}
      </h2>
      {details()}
      {blog.comments && (
        <>
          <h3>comments</h3>
          <div>
            <input
              type='text'
              value={comment}
              id='cmt'
              onChange={(event) => {
                setComment(event.target.value)
              }}
            />
            <button
              onClick={() => {
                if (comment === '') {
                  window.alert('comment cannot be empty')
                } else {
                  handleComment(blog.id, comment)
                }
                setComment('')
              }}
            >
              add comment
            </button>
          </div>
          <ul>
            {blog.comments.map((com, index) => (
              <li key={index}>{com}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Blog
