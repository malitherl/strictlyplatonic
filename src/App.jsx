import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import { MyProfile } from './components/MyProfile'
import { Home } from './components/Home'
import  Events  from './components/Events'

import UserProfile from "./components/UserProfile";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home/>} >
              <Route path= "myprofile" element= {<MyProfile />} />
              <Route path= "userprofile" element= {<UserProfile />} />
           </Route>     
           <Route path="events" element= {<Events />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
