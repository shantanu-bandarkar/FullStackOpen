import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  addNewBlog,
  likeBlog,
  removeBlog,
} from './reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const dispatch = useDispatch()
  const fetchedBlogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
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
      dispatch(setNotification(`Welcome ${username}`))
    } catch (exception) {
      dispatch(setNotification('invalid username or password', 'error'))
      // console.error(exception);
    }
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedObj = await blogService.create(newBlog)
      dispatch(addNewBlog(returnedObj))

      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`,
          'success'
        )
      )
    } catch (exception) {
      /* empty */
    }
  }

  const updateBlogLikes = async (blog) => {
    const returnedObj = await blogService.updateLikes(blog)
    dispatch(likeBlog(returnedObj))
    console.log('AAA', blog)
  }

  const deleteBlog = async (BlogToDelete) => {
    if (window.confirm(`Delete ${BlogToDelete.title} ?`)) {
      try {
        const res = await blogService.remove(BlogToDelete.id)
        dispatch(
          setNotification(
            `Blog ${BlogToDelete.title} was successfully deleted`,
            'success'
          )
        )
        dispatch(removeBlog(BlogToDelete))
      } catch {
        dispatch(setNotification('Unauthorized to delete blog', 'error'))
      }
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
        <Notification />

        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
              type='text'
              id='username'
              value={username}
              onChange={({ target }) => {
                setUsername(target.value)
              }}
            />
          </div>
          <div>
            password:
            <input
              type='password'
              id='password'
              value={password}
              onChange={({ target }) => {
                setPassword(target.value)
              }}
            />
          </div>
          <button id='login-button' type='submit'>
            Login
          </button>
        </form>
      </>
    )
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification />

      <div>
        <span>{username} logged in</span>
        <button type='button' onClick={handleLogout}>
          logout
        </button>
      </div>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {fetchedBlogs.map((blog) => (
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
