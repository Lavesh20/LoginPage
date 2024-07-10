import { useState } from 'react'
import React from 'react'
import {BrowserRouter as Router ,Routes ,Route} from "react-router-dom"; 
import './App.css'
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';
import Forgotpassword from './component/Forgotpassword';
import ResetPassword from './component/ResetPassword';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element = {<Login/>}></Route>
        <Route path='/signup' element = {<Signup/>}></Route>
        <Route path='/home' element = {<Home/>}></Route>
        <Route path='/forgot-password' element = {<Forgotpassword/>}></Route>
        <Route path='/reset-password/:id/:token' element = {<ResetPassword/>}></Route>
      </Routes>
    </Router>
      
    </>
  )
}

export default App
