import { useState } from 'react'
import { BrowserRouter as  Router, Routes, Route } from 'react-router-dom'
import Header from './layouts/Header'
import Home from './Pages/Home'
import About from './Pages/About'
import SinglePage from './Pages/SinglePage'
import Update from './Pages/Updates'

function App() {
  

  return (
    <>
    <Router>
    <Header />
    <Routes >
      <Route path='/Home' element={<Home />}  />
      <Route path='/About' element={<About />}  />
       <Route path="/SinglePage/:productId" element={<SinglePage />}  />
        <Route path="/Updates/:productId" element={<Update />}  />
    </Routes>
    </Router>
  
     
    </>
  )
}

export default App
