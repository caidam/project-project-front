import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
// Pages
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import NoPage from './pages/NoPage'
import LoginPage from './pages/LoginPage'
import HeaderComponent from './components/HeaderComponent'
import PrivateRoutes from './utils/PrivateRoutes'
import SignupPage from './pages/SignupPage'
import LandingPage from './pages/LandingPage'
import ActivationSuccessPage from './pages/ActivationSuccessPage'

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <AuthProvider>

          <HeaderComponent/>

          <Routes>

            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/landing' element={<LandingPage />} />
            <Route path='/activate/:uid/:token' element={<ActivationSuccessPage />} />

            
            <Route element={<PrivateRoutes />}>
              <Route path='*' element={<NoPage />} />
              <Route index element={<HomePage />} />
              <Route path='/home' element={<HomePage />} />
              <Route path='/contact' element={<ContactPage />} />
              <Route path='/about' element={<AboutPage />} />
            </Route>

          </Routes>

        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App