import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DJ_BASE_URL } from '../config'

const PasswordResetRequestPage = () => {
  const navigate = useNavigate()

  let requestPasswordReset = async (e) => {
    e.preventDefault()

    let response = await fetch(`${DJ_BASE_URL}/api/request-password-reset/`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            'email':e.target.email.value
        })
    });

    if (response.status == 200) {
        alert('Password reset email has been sent.');
        navigate('/login');
    } else {
        alert('Something went wrong!');
    }
  }

  return (
    <div>
        <h1>Password Reset Request Page</h1>
        <p>Enter your email to request a password reset.</p>
        <form onSubmit={requestPasswordReset}>
            <input type="email" name="email" placeholder='Enter Email' />
            <input type="submit" />
        </form>
    </div>
  )
}

export default PasswordResetRequestPage