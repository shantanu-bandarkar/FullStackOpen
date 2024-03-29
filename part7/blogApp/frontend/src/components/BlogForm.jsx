import { React, useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [content, setContent] = useState({
    blogTitle: "",
    blogAuthor: "",
    blogUrl: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    createBlog({
      title: content.blogTitle,
      author: content.blogAuthor,
      url: content.blogUrl,
    });
  };
  return (
    <>
      <h2>Add new Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            id="Title"
            value={content.blogTitle}
            onChange={({ target }) =>
              setContent({ ...content, blogTitle: target.value })
            }
          />
        </div>
        <div>
          author:
          <input
            type="text"
            id="Author"
            value={content.blogAuthor}
            onChange={({ target }) =>
              setContent({ ...content, blogAuthor: target.value })
            }
          />
        </div>
        <div>
          url:
          <input
            type="text"
            id="Url"
            value={content.url}
            onChange={({ target }) =>
              setContent({ ...content, blogUrl: target.value })
            }
          />
        </div>
        <button id="submit-button" type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
