import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ThemeProvider } from 'components/ThemeProvider/ThemeProvider'
import Navbar from 'domains/Navbar/Navbar'
import Kanjium from 'domains/Kanjium/Kanjium'
import Kentei from 'domains/Kentei/Kentei'

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}

export default App
