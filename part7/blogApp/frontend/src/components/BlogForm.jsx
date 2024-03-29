import { React, useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [content, setContent] = useState({
    blogTitle: '',
    blogAuthor: '',
    blogUrl: '',
  })
  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title: content.blogTitle,
      author: content.blogAuthor,
      url: content.blogUrl,
    })
  }
  return (
    <div className='container'>
      <h3>Add new Blog</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          title:
          <input
            type='text'
            id='Title'
            className='form-control'
            value={content.blogTitle}
            onChange={({ target }) =>
              setContent({ ...content, blogTitle: target.value })
            }
          />
        </div>
        <div className='form-group'>
          author:
          <input
            type='text'
            id='Author'
            className='form-control'
            value={content.blogAuthor}
            onChange={({ target }) =>
              setContent({ ...content, blogAuthor: target.value })
            }
          />
        </div>
        <div className='form-group'>
          url:
          <input
            type='text'
            id='Url'
            className='form-control'
            value={content.url}
            onChange={({ target }) =>
              setContent({ ...content, blogUrl: target.value })
            }
          />
        </div>
        <button id='submit-button' type='submit'>
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
