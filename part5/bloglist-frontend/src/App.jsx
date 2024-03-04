import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState({ content: null, type: null })
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      // blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setUserToken(user.token)
      setUsername(user.username)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setUserToken(user.token)
    } catch (exception) {
      setMessage({ content: 'invalid username or password', type: 'error' })
      // console.error(exception);
      setTimeout(() => {
        setMessage({ content: null, type: null })
      }, 5000)
    }
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedObj = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedObj))
      setMessage({
        content: `a new blog ${returnedObj.title} by ${returnedObj.author} added`,
        type: 'success',
      })
      // console.log("added blog");
      setTimeout(() => {
        setMessage({ content: null, type: null })
      }, 5000)
    } catch (exception) { /* empty */ }
  }

  const updateBlogLikes = async (arr) => {
    // console.log("AAA", arr);
    const returnedObj = await blogService.updateLikes(arr[0], arr[1])
    setBlogs((prevBlogs) => {
      const updatedBlogs = prevBlogs.map((blog) =>
        blog.id === returnedObj.id ? returnedObj : blog
      )
      return updatedBlogs
    })
  }

  const deleteBlog = async (BlogToDelete) => {
    if (window.confirm(`Delete ${BlogToDelete.title} ?`)) {
      // console.log("CCC", BlogToDelete);
      blogService.remove(BlogToDelete.id)
      setMessage(`Blog ${BlogToDelete.title} was successfully deleted`)
      setBlogs(blogs.filter((blog) => blog.id !== BlogToDelete.id))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setUsername('')
    setPassword('')
  }

  if (user === null) {
    return (
      <>
        <Notification message={message.content} type={message.type} />

        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
              type="text"
              name="Username"
              value={username}
              onChange={({ target }) => {
                setUsername(target.value)
              }}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              name="Password"
              value={password}
              onChange={({ target }) => {
                setPassword(target.value)
              }}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </>
    )
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification message={message.content} type={message.type} />

      <div>
        <span>{username} logged in</span>
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </div>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs
        .sort((b1, b2) => b2.likes - b1.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleUpdate={updateBlogLikes}
            handleRemove={deleteBlog}
          />
        ))}
    </>
  )
}

export default App
