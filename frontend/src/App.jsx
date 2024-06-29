import { useState } from 'react'
import React from 'react'
import {BrowserRouter as Router ,Routes ,Route} from "react-router-dom"; 
import './App.css'
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element = {<Login/>}></Route>
        <Route path='/signup' element = {<Signup/>}></Route>
        <Route path='/home' element = {<Home/>}></Route>
      </Routes>
    </Router>
      
    </>
  )
}

export default App
