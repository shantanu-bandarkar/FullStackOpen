import React from 'react'

const BlogsByUser = ({ user }) => {
  if (!user) return null
  return (
    <>
      <h2>{user.name}</h2>
      <div className='container'>
        <h3>added blogs</h3>
        <ul className='list-group'>
          {user.blogs.map((blog) => (
            <li className='list-group-item list-group-item-light' key={blog.id}>
              {blog.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default BlogsByUser
