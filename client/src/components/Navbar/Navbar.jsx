import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import {
  BsCardHeading as KenteiIcon,
  BsSoundwave as KanjiumIcon,
  BsArrowDownCircle as DropdownIcon,
  BsArrowLeftShort as ArrowLeftIcon,
  BsGearFill as SettingsIcon,
  BsChevronBarRight as ChevronIcon
} from 'react-icons/bs'

import { ReactComponent as Logo } from 'assets/shared/logo.svg'

import styles from './Navbar.module.scss'
import 'styles/index.scss'
import 'styles/partials/_anim.scss'

const ICON_SIZE = 24

const Navbar = () => (
  <nav className={styles.navbar}>
    <div className={styles['logo-container']}>
      <Logo className={styles.logo} />
      <span>Princess</span>
    </div>

    <ul className={styles['navbar-nav']}>
      <NavItem
        to="kentei"
        icon={<KenteiIcon size={ICON_SIZE} />}
        tooltip="Kentei"
      />
      <NavItem
        to="kanjium"
        icon={<KanjiumIcon size={ICON_SIZE} />}
        tooltip="Kanjium"
      />

      <NavItem
        to="#"
        icon={<DropdownIcon size={ICON_SIZE} />}
        tooltip="Settings">
        <DropdownMenu />
      </NavItem>
    </ul>
  </nav>
)

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
  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null)
  const dropdownRef = useRef(null)

  // prevent findDOMNode
  const primaryRef = useRef(null),
    secondaryRef = useRef(null)

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  const calcHeight = (el) => {
    const height = el.offsetHeight
    setMenuHeight(height)
  }

  const DropdownItem = (props) => (
    <div
      className={styles['menu-item']}
      onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
      <span className={styles['icon-button']}>{props.leftIcon}</span>
      {props.children}
      <span className={styles['icon-right']}>{props.rightIcon}</span>
    </div>
  )

  return (
    <div
      className={styles.dropdown}
      style={{ height: menuHeight }}
      ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
        nodeRef={primaryRef}>
        <div className={styles.menu} ref={primaryRef}>
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<SettingsIcon size={ICON_SIZE} />}
            rightIcon={<ChevronIcon size={ICON_SIZE} />}
            goToMenu="settings">
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'settings'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
        nodeRef={secondaryRef}>
        <div className={styles.menu} ref={secondaryRef}>
          <DropdownItem
            leftIcon={<ArrowLeftIcon size={ICON_SIZE} />}
            goToMenu={'main'}
          />
          <DropdownItem>Settings</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  )
}

export default Navbar
