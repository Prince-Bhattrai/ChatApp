import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Inbox from './pages/inbox/Inbox'
import { ToastContainer } from 'react-toastify'
import AddContact from './pages/addContact/AddContact'
import Chat from './pages/chat/Chat'
import Profile from './pages/settings/Profile'

const App = () => {

  
  return (
    <>
    <ToastContainer />
    <Routes >
      
      <Route  path='/auth' element={<Auth />}/>
      <Route path='/' element ={<Inbox />} />
      <Route path='/contact' element = {<AddContact />} />
      <Route path='/chat/:id' element={<Chat />} />
      <Route path='/profile/:id' element={<Profile />} />
    </Routes>
    </>
  )
}

export default App