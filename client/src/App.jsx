import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from 'domains/Navbar/Navbar'
import ThemeProvider from 'domains/ThemeProvider/ThemeProvider'
import CommandMenu from 'domains/CommandMenu/CommandMenu'
import Kentei from 'domains/Kentei/Kentei'
import Kanjium from 'domains/Kanjium/Kanjium'
import Footer from 'domains/Footer/Footer'

function App() {
  return (
    <ThemeProvider>
      <CommandMenu />
      <BrowserRouter>
        <Navbar />

        <main>
          <Routes>
            <Route path="kentei" element={<Kentei />} />
            <Route path="kanjium" element={<Kanjium />} />
            <Route path="/" element={<Kanjium />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
