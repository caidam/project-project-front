import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {

  let { loginUser } = useContext(AuthContext)

  return (
    <div>
        <h1>Login Page</h1>
        <p>Login using your credentials</p>
        <form onSubmit={loginUser}>
            <input type="text" name="username" placeholder='Enter Username' />
            <input type="password" name="password" placeholder='Enter Password' />
            <input type="submit" />
        </form>
    </div>
  )
}

export default LoginPage