import { useState } from 'react'

const Blog = ({ blog, handleUpdate, handleRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
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
        <p>{blog.url}</p>
        <div>
          <span>likes {blog.likes}</span>
          <button id='like-button' onClick={handleUpdateLike}>
            like
          </button>
        </div>
        <p>{blog.user.username}</p>
        <button onClick={removeBlog}>remove</button>
      </>
    )
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      {visible && details()}
    </div>
  )
}

export default Blog
