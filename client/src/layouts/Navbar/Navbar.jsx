import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import {
  BsCardHeading as KenteiIcon,
  BsSoundwave as KanjiumIcon,
  BsList as DropdownIcon
} from 'react-icons/bs'

import { ReactComponent as Logo } from 'assets/shared/logo.svg'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'

import styles from './Navbar.module.scss'
import 'styles/index.scss'
import 'styles/partials/_anim.scss'

const ICON_SIZE = 24

const Navbar = () => (
  <nav className={styles.container}>
    <div className={styles.logoContainer}>
      <Logo className={styles.logo} />
      <span>Princess</span>
    </div>

    <ul className={styles.navContainer}>
      <NavItem to="kentei" icon={<KenteiIcon size={ICON_SIZE} />} tooltip="Kentei" />
      <NavItem
        to="kanjium"
        icon={<KanjiumIcon size={ICON_SIZE} />}
        tooltip="Kanjium"
      />

      <NavItem
        isDropdown
        icon={<DropdownIcon size={ICON_SIZE} />}
        tooltip="Settings"
      >
        <DropdownMenu />
      </NavItem>
    </ul>
  </nav>
)

const NavItem = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <li className={styles.navItem}>
      {props.isDropdown ? (
        <div className={classNames(styles.navLink, { [styles.active]: open })}>
          <span
            className={styles.navIcon}
            onClick={() => props.isDropdown && setOpen(!open)}
          >
            {props.icon}
          </span>
          {open && props.children}
        </div>
      ) : (
        <NavLink to={props.to} className={styles.navLink}>
          <span className={styles.navIcon} onClick={() => setOpen(!open)}>
            {props.icon}
          </span>
          <span className={styles.navTooltip}>{props.tooltip}</span>
          {open && props.children}
        </NavLink>
      )}
    </li>
  )
}

export default Navbar
