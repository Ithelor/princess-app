import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from 'domains/Navbar/Navbar'
import Kanjium from 'domains/Kanjium/Kanjium'
import Kentei from 'domains/Kentei/Kentei'

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
