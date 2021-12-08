import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import { Landing } from './components/Landing/Landing'
import { Home } from './components/Home/Home'
import About from './components/About/About'



function App() {
	return (
		<BrowserRouter>
			<Header />

			<main id="main">
				<Routes>
					<Route path="" element={<Landing />} />
					<Route path="home" element={<Home />} />
					<Route path="about" element={<About />} />
				</Routes>
			</main>
		</BrowserRouter>
	)
}

export default App
