import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './App.css'
import { Profile } from './components/Profile'
import { Login } from './components/Login'
import { Home } from './components/Home'
import { Events } from './components/Events'
import { Settings } from './components/Settings'
import { SignUp } from './components/SignUp'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home/>} >
           <Route path= "profile" element= {<Profile />} />
           <Route path="events" element= {<Events />} />
           <Route path="settings" element= {<Settings />} />
        </Route>
        <Route path="login" element= {<Login/>}/> 
        <Route path="signup" element = {<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
