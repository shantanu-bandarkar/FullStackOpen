import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Users = () => {
  const users = useSelector((state) => state.users)
  if (!users) return null

  return (
    <div className='container'>
      <h2>Users</h2>
      <table className='table'>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link
                  className='text-primary text-decoration-none'
                  to={`/users/${user.id}`}
                >
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
