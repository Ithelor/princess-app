import React from 'react'
import { NavLink } from 'react-router-dom'
import {
	BsFillPlayBtnFill as LandingIcon,
	BsHouseFill as HomeIcon,
	BsPatchQuestion as AboutIcon,
	BsGearFill as SettingsIcon
} from 'react-icons/bs'

import { ReactComponent as Logo } from 'assets/shared/logo.svg'

import styles from './Header.module.scss'
import 'index.scss'

const Header = () => {

	const IconSize = 24

	return (

		<header>

			<div className={styles['logo-container']}>
				<Logo className={styles.logo} />
				<span>Princess</span>
			</div>

			<nav>
				<ul className='flex'>

					<li className=''>
						<NavLink to="/">
							<NavIcon icon={<LandingIcon size={IconSize} />} tooltip='Landing' />
							{/* <span className=''>00</span>Landing */}
						</NavLink>
					</li>

					<li>
						<NavLink to="home">
							<NavIcon icon={<HomeIcon size={IconSize} />} tooltip='Home' />
							{/* <span className=''>01</span>Home */}
						</NavLink>
					</li>

					<li>
						<NavLink to="about">
							<NavIcon icon={<AboutIcon size={IconSize} />} tooltip='About' />
							{/* <span className=''>02</span>About */}
						</NavLink>
					</li>
				</ul>
			</nav>

			<div>
				<NavIcon icon={<SettingsIcon size={IconSize} />} tooltip='Settings' />
			</div>
		</header>
	)
}

const NavIcon = ({ icon, tooltip }) => (

	<div className={styles['nav-icon']}>
		{icon}

		<span className={styles['nav-tooltip']}>
			{tooltip}
		</span>

	</div>
)

export default Header