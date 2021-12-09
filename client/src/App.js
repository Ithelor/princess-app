import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import About from 'components/About/About'
import Header from 'components/Header/Header'
import { Home } from 'components/Home/Home'
import { Landing } from 'components/Landing/Landing'

function App() {
	return (
		<BrowserRouter>
			<Header />

			<main>
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
