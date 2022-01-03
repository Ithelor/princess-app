import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from 'components/Navbar/Navbar'
import Kanjium from 'components/Kanjium/Kanjium'
import Kentei from 'components/Kentei/Kentei'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="kentei" element={<Kentei />} />
          <Route path="kanjium" element={<Kanjium />} />
          <Route path="#" element={<Kanjium />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
