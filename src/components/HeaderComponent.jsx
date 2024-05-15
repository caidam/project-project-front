import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const HeaderComponent = () => {

  let { user, logoutUser } = useContext(AuthContext)
  let location = useLocation()

  return (
    <div>
      <Link to="/" >Home</Link>
      <span> | </span>
      { user ? (
        <Link onClick={ logoutUser }>Logout</Link>
      ) : (
        <>
          { location.pathname !== '/login' && <Link to="/login" >Login</Link> }
          { location.pathname === '/login' && <Link to="/signup" >Signup</Link> }
        </>
      )}

      { user && <p>Hello {user.username}</p> }
      
    </div>
  )
}

export default HeaderComponent;