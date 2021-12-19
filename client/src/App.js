import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import About from 'components/About/About'
import Card from 'components/Card/Card'
import Header from 'components/Header/Header'
import Home from 'components/Home/Home'
import Landing from 'components/Landing/Landing'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="about" element={<About />} />
        <Route path="card" element={<Card />} />
        <Route path="home" element={<Home />} />
        <Route path="" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
