import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ content: null, type: null });
  const [user, setUser] = useState(null);
  const [blogContent, setBlogContent] = useState({
    title: "",
    author: "",
    url: "",
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setUserToken(user.token);
      setUsername(user.username);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      blogService.setUserToken(user.token);
    } catch (exception) {
      setMessage({ content: "invalid username or password", type: "error" });
      // console.error(exception);
      setTimeout(() => {
        setMessage({ content: null, type: null });
      }, 5000);
    }
  };

  const addBlog = async (e) => {
    e.preventDefault();

    const newBlog = {
      title: blogContent.title,
      author: blogContent.author,
      url: blogContent.url,
    };

    try {
      const returnedObj = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedObj));
      setMessage({
        content: `a new blog ${returnedObj.title} by ${returnedObj.author} added`,
        type: "success",
      });
      // console.log("added blog");
      setTimeout(() => {
        setMessage({ content: null, type: null });
      }, 5000);
    } catch (exception) {}
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    setUsername("");
    setPassword("");
  };

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
                setUsername(target.value);
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
                setPassword(target.value);
              }}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </>
    );
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification message={message.content} type={message.type} />

      <p>{username} logged in</p>
      <button type="button" onClick={handleLogout}>
        logout
      </button>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            name="Title"
            value={blogContent.title}
            onChange={({ target }) =>
              setBlogContent({ ...blogContent, title: target.value })
            }
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            value={blogContent.author}
            onChange={({ target }) =>
              setBlogContent({ ...blogContent, author: target.value })
            }
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="Url"
            value={blogContent.url}
            onChange={({ target }) =>
              setBlogContent({ ...blogContent, url: target.value })
            }
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default App;
