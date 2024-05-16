import React from 'react'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {

  const navigate = useNavigate()

  let signupUser = async (e) => {
    e.preventDefault()

    let response = await fetch('http://127.0.0.1:8000/api/users/', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            'username':e.target.username.value, 
            'password':e.target.password.value
        })
    });

    let data = await response.json()

    if (response.status == 201) {
        alert('Account created successfully!');
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
            <input type="password" name="password" placeholder='Select Password' />
            <input type="submit" />
        </form>
    </div>
  )
}

export default SignupPage