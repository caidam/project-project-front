import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoutes = () => {
  let { user } = useContext(AuthContext)

  return (
    // auth.token ? <Outlet /> : <Navigate to='/login' />
    user ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoutes