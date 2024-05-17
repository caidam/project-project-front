import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PasswordResetConfirmPage = () => {
  const navigate = useNavigate()
  const { uidb64, token } = useParams()

  let confirmPasswordReset = async (e) => {
    e.preventDefault()

    let response = await fetch(`http://127.0.0.1:8000/api/reset-password-confirm/${uidb64}/${token}/`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            'password':e.target.password.value
        })
    });

    if (response.status == 200) {
        alert('Password has been reset.');
        navigate('/login');
    } else {
        alert('Something went wrong!');
    }
  }

  return (
    <div>
        <h1>Password Reset Confirm Page</h1>
        <p>Enter your new password.</p>
        <form onSubmit={confirmPasswordReset}>
            <input type="password" name="password" placeholder='Enter New Password' />
            <input type="submit" />
        </form>
    </div>
  )
}

export default PasswordResetConfirmPage