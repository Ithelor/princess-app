import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Kentei from 'components/Kentei/Kentei'
import Header from 'components/Header/Header'
import Kanjium from 'components/Kanjium/Kanjium'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="kentei" element={<Kentei />} />
        <Route path="kanjium" element={<Kanjium />} />
        <Route path="" element={<Kanjium />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
