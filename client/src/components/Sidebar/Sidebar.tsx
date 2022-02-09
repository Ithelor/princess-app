import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from 'assets/shared/logo.svg'
import { BsCardHeading as KenteiIcon, BsSoundwave as KanjiumIcon, BsPersonFill as UserIcon } from 'react-icons/bs'

import Auth from 'components/Auth/Auth'

import styles from './styles.module.scss'

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <ul className={classNames(styles.stickBar, { [styles.expanded]: isExpanded })}>
          <NavLink onClick={() => setIsExpanded(false)} to="/kanjium">
            <KanjiumIcon />
            <span className={classNames({ [styles.expanded]: isExpanded })}>Kanjium</span>
          </NavLink>

          <NavLink onClick={() => setIsExpanded(false)} to="/kentei">
            <KenteiIcon />
            <span className={classNames({ [styles.expanded]: isExpanded })}>Kentei</span>
          </NavLink>
        </ul>

        <div className={styles.profile}>
          <UserIcon />

          <div className={classNames(styles.details, { [styles.expanded]: isExpanded })}>
            <div className={styles.name}>
              <h4>Username</h4>
              <NavLink to="/">Profile</NavLink>
            </div>

            <Auth />
          </div>
        </div>

        <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? 'Hide' : 'Show'}</button>
      </div>
    </div>
  )
}

export default Sidebar
