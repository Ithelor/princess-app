import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import logo from '../logo.svg'

export default class Header extends Component {

	render() {
		return (
			<div className="header">
				<div className="header-left">
					<img src={logo} className="App-logo" alt="logo" />
					<p>Princess</p>
				</div>

				<div className="header-right">

						<nav>
							<NavLink to="/">Landing</NavLink>
							<NavLink to="home">Home</NavLink>
							<NavLink to="about">About</NavLink>
						</nav>

						<div>
							<input placeholder="Enter query" />
							<a href="#default" className="button">Search</a>
						</div>
				</div>
			</div>
		)
	}
}