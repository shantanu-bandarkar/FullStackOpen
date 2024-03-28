import { useState } from 'react'

const Blog = ({ blog, handleUpdate, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  if (!blog) return null
  // console.log(blog)
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

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
    <div className='blog' style={blogStyle}>
      <h2>
        {blog.title} {blog.author}
      </h2>
      {details()}
    </div>
  )
}

export default Blog
