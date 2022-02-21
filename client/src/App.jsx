import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ThemeProvider from 'layouts/ThemeProvider/ThemeProvider'
import CommandMenu from 'layouts/CommandMenu/CommandMenu'
import Navbar from 'layouts/Navbar/Navbar'
import Footer from 'layouts/Footer/Footer'
import Kentei from 'pages/Kentei/Kentei'
import Kanjium from 'pages/Kanjium/Kanjium'

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
