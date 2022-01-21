import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ThemeProvider from 'components/ThemeProvider/ThemeProvider'
import Navbar from 'domains/Navbar/Navbar'
import Footer from 'domains/Footer/Footer'
import Kanjium from 'domains/Kanjium/Kanjium'
import Kentei from 'domains/Kentei/Kentei'
import CommandMenu from 'domains/CommandMenu/CommandMenu'

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
