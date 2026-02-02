import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'
import DashboardPage from './pages/dashboard'
import Chatbot from './pages/chatbot'
import Profile from './pages/profile'
import EditProfile from './pages/editProfile'
import { AuthRoute } from './routes/authRoute'
import { PrivateRoute } from './routes/privateRoute'
import NotFound from './pages/notFound'

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<AuthRoute/>}>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        </Route>
        
        <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/chatbot' element={<Chatbot/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/editProfile' element={<EditProfile/>}/>    

        </Route>

        <Route path='*' element={<NotFound/>}/>

      </Routes>
      
    </div>
  )
}

export default App
