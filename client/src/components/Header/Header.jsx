import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  BsFillPlayBtnFill as LandingIcon,
  BsHouseFill as HomeIcon,
  BsPatchQuestion as AboutIcon,
  BsGearFill as SettingsIcon,
  BsPersonBadgeFill as ProfileIcon,
  BsChevronBarRight as ChevronIcon
} from 'react-icons/bs'

import { ReactComponent as Logo } from 'assets/shared/logo.svg'

import styles from './Header.module.scss'
import 'styles/index.scss'

const IconSize = 24

const Header = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles['logo-container']}>
        <Logo className={styles.logo} />
        <span>Princess</span>
      </div>

      <ul className={styles['navbar-nav']}>
        <NavItem
          to="/"
          icon={<LandingIcon size={IconSize} />}
          tooltip="Landing"
        />

        <NavItem to="home" icon={<HomeIcon size={IconSize} />} tooltip="Home" />

        <NavItem
          to="about"
          icon={<AboutIcon size={IconSize} />}
          tooltip="About"
        />

        <NavItem
          to="#"
          icon={<SettingsIcon size={IconSize} />}
          tooltip="Settings"
        >
          <DropdownMenu />
        </NavItem>
      </ul>
    </nav>
  )
}

const NavItem = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <li>
      <NavLink to={props.to} className={styles.navlink}>
        <span className={styles['nav-icon']} onClick={() => setOpen(!open)}>
          {props.icon}
        </span>
        <span className={styles['nav-tooltip']}>{props.tooltip}</span>
        {open && props.children}
      </NavLink>
    </li>
  )
}

const DropdownMenu = () => {
  const DropdownItem = (props) => (
    <div className={styles['menu-item']}>
      <span className={styles['icon-button']}>{props.leftIcon}</span>

      {props.children}

      <span className={styles['icon-right']}>{props.rightIcon}</span>
    </div>
  )

  return (
    <div className={styles.dropdown}>
      <DropdownItem>My Profile</DropdownItem>
      <DropdownItem
        leftIcon={<ProfileIcon size={IconSize} />}
        rightIcon={<ChevronIcon size={IconSize} />}
      ></DropdownItem>
    </div>
  )
}

export default Header
