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
import { setUser } from './reducers/loggedInUserReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useMatch } from 'react-router'
import Users from './components/Users'
import { fetchUsers } from './reducers/usersReducer'
import BlogsByUser from './components/BlogsByUser'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { Button } from 'react-bootstrap'
const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedUser)
  const fetchedBlogs = useSelector((state) => state.blogs)
  const fetchedUsers = useSelector((state) => state.users)
  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(fetchUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setUserToken(user.token)
      setUsername(user.username)
    }
  }, [])

  const individualUser = userMatch
    ? fetchedUsers.find((user) => user.id === userMatch.params.id)
    : null

  const individualBlog = blogMatch
    ? fetchedBlogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setUserToken(user.token)
      dispatch(setNotification(`Welcome ${username}`, 'primary'))
    } catch (exception) {
      dispatch(setNotification('invalid username or password', 'danger'))
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
        navigate('/')
      } catch {
        dispatch(setNotification('Unauthorized to delete blog', 'danger'))
      }
    }
  }

  const addComment = async (id, comment) => {
    const res = await blogService.addComment(id, comment)
    dispatch(initializeBlogs())
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
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
          <Button id='login-button' type='submit'>
            Login
          </Button>
        </form>
      </>
    )
  }

  const blogList = () => {
    return (
      <ul className='list-group'>
        {fetchedBlogs.map((blog) => (
          <li className='list-group-item list-group-item-light' key={blog.id}>
            <Link
              to={`/blogs/${blog.id}`}
              className='text-info text-decoration-none'
            >
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to='/' className='nav-link p-3'>
              blogs
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/users' className='nav-link p-3'>
              users
            </Link>
          </li>
          <li className='nav-item'>
            <i className='nav-link text-white p-3'>{username} logged in</i>
          </li>
        </ul>
        <Button type='button' onClick={handleLogout} className='ml-auto'>
          logout
        </Button>
      </nav>
      <h1 className='text-center'>blog app</h1>
      <Notification />

      <Routes>
        <Route
          path='/'
          element={
            <div className='container'>
              <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
              </Togglable>
              {blogList()}
            </div>
          }
        />
        <Route path='/users' element={<Users />} />
        <Route
          path='/users/:id'
          element={<BlogsByUser user={individualUser} />}
        />
        <Route
          path='/blogs/:id'
          element={
            <Blog
              blog={individualBlog}
              handleUpdate={updateBlogLikes}
              handleRemove={deleteBlog}
              handleComment={addComment}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App
