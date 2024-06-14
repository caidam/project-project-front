import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DJ_BASE_URL } from '../config'

const SignupPage = () => {

  const navigate = useNavigate()

  let signupUser = async (e) => {
    e.preventDefault()

    let response = await fetch(`${DJ_BASE_URL}/api/register/`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            'username':e.target.username.value, 
            'email':e.target.email.value,
            'password':e.target.password.value
        })
    });

    let data = await response.json()

    // if (response.status == 201) {
    if (response.status == 200) {
        alert('Account created successfully! Please check your email to verify your account.');
        navigate('/login');
    } else {
        alert('Something went wrong!');
    }
  }

  return (
    <div>
        <h1>Signup Page</h1>
        <p>Define your login credentials.</p>
        <form onSubmit={signupUser}>
            <input type="text" name="username" placeholder='Select Username' />
            <input type="email" name="email" placeholder='Enter Email' />
            <input type="password" name="password" placeholder='Select Password' />
            <input type="submit" />
        </form>
    </div>
  )
}

export default SignupPage