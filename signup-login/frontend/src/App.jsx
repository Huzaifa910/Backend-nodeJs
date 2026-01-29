import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'
import DashboardPage from './pages/dashboard'
import Chatbot from './pages/chatbot'
import Profile from './pages/profile'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/chatbot' element={<Chatbot/>}/>
        <Route path='/profile' element={<Profile/>}/>



      </Routes>
      
    </div>
  )
}

export default App
