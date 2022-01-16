import React from 'react'
import { CSSTransition } from 'react-transition-group'
import {
  BsArrowLeftShort as ArrowLeftIcon,
  BsGearFill as SettingsIcon,
  BsChevronBarRight as ChevronIcon
} from 'react-icons/bs'

import styles from './DropdownMenu.module.scss'

interface DropdownItemProps {
  goToMenu?: string
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
  children?: React.ReactChildren | string
}

const ICON_SIZE = 24

const DropdownMenu = () => {
  const [activeMenu, setActiveMenu] = React.useState('main')
  const [menuHeight, setMenuHeight] = React.useState<number>()
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // prevent findDOMNode
  const primaryRef = React.useRef(null),
    secondaryRef = React.useRef(null)

  React.useEffect(() => {
    setMenuHeight(dropdownRef.current?.offsetHeight)
  }, [])

  const calcHeight = (el: HTMLElement) => {
    const height = el.offsetHeight
    setMenuHeight(height)
  }

  const DropdownItem = (props: DropdownItemProps) => (
    <div
      className={styles.dropdownItem}
      onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
    >
      <span>{props.leftIcon}</span>
      {props.children}
      <span className={styles.iconRight}>{props.rightIcon}</span>
    </div>
  )

  return (
    <div
      className={styles.dropdownContainer}
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
        nodeRef={primaryRef}
      >
        <div className={styles.dropdownMenu} ref={primaryRef}>
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<SettingsIcon size={ICON_SIZE} />}
            rightIcon={<ChevronIcon size={ICON_SIZE} />}
            goToMenu="settings"
          >
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
        nodeRef={secondaryRef}
      >
        <div className={styles.dropdownMenu} ref={secondaryRef}>
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

export default DropdownMenu
