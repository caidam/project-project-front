import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { DJ_BASE_URL } from '../config'
import { Button } from '@/components/ui/button'

const ActivationSuccessPage = () => {
  const { uid, token } = useParams()
  // const navigate = useNavigate()
  const [message, setMessage] = useState('')

  useEffect(() => {
    const activateUser = async () => {
      const response = await fetch(`${DJ_BASE_URL}/api/activate/${uid}/${token}/`)
      if (response.ok) {
        // The user was successfully activated
        setMessage('Congratulations! User activation was successful, you can now login.')
      } else {
        // Something went wrong
        setMessage('User activation failed. Please try again.')
      }
    }

        activateUser()
  }, [uid, token])

  return (
    <div className="flex items-center justify-center min-h-screen py-16">
      <div
        className="flex flex-1 items-center justify-center w-full max-w-screen-lg p-8 rounded-lg border border-full shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center p-32">
          <h3 className="text-2xl font-bold tracking-tight">
            Account Activation
          </h3>
          <p className="text-md p-8">
            {message}
          </p>
          <Button className="mt-4"> <Link to="/login"> Sign In </Link> </Button>
        </div>
      </div>
    </div>

  )
}

export default ActivationSuccessPage