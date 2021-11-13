import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Landing } from './components/Landing'
import { Home } from './components/Home'
import About from './components/About'
import Header from './components/Header'

function App() {
	return (

		<BrowserRouter>

			<div className="App">
				<Header />

				<main>
					<section>
						<Routes>
							<Route path="" element={<Landing />} />
							<Route path="home" element={<Home />} />
							<Route path="about" element={<About />} />
						</Routes>
					</section>
				</main>

			</div>

		</BrowserRouter>

	)
}

export default App