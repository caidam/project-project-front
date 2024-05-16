import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const ActivationSuccessPage = () => {
  const { uid, token } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')

  useEffect(() => {
    const activateUser = async () => {
      const response = await fetch(`http://localhost:8000/api/activate/${uid}/${token}/`)
      if (response.ok) {
        // The user was successfully activated
        setMessage('User activation successful, you can now login.')
        // alert('User activation successful, you can now login.')
        // setTimeout(() => navigate('/login'), 0);
      } else {
        // Something went wrong
        setMessage('User activation failed. Please try again.')
        // alert('User activation failed. Please try again.')
        // setTimeout(() => navigate('/login'), 0);
      }
    }

        activateUser()
  }, [uid, token])

  return (
    <div>
      {message}
    </div>
  )
}

export default ActivationSuccessPage