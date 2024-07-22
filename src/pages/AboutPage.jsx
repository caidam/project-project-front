import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { Dashboard } from '@/components/HomeComponent'
import Navbar from '@/components/Navbar'

const AboutPage = () => {
  return (
    <>
        <Navbar>
          <Dashboard/>
        </Navbar>
    </>
  )
}

export default AboutPage