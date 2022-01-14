import { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { BsSun as LightThemeIcon, BsMoon as DarkThemeIcon } from 'react-icons/bs'

import styles from './ThemeSwitch.module.scss'
import 'styles/index.scss'

const ICON_SIZE = 24

const ThemeSwitch = () => {
  const [isDark, setIsDark] = useState(localStorage.getItem('isDark') === 'true')

  document.body.classList.add(isDark ? 'dark' : 'light')

  const switchTheme = () => {
    if (isDark) {
      document.body.classList.replace('dark', 'light')
      localStorage.setItem('isDark', 'false')
      setIsDark(false)
    } else {
      document.body.classList.replace('light', 'dark')
      localStorage.setItem('isDark', 'true')
      setIsDark(true)
    }
  }

  // TODO: fix transitions
  return (
    <button className={styles.themeSwitch} onClick={() => switchTheme()}>
      <CSSTransition
        in={isDark}
        timeout={300}
        classNames="ease"
        // nodeRef={}
      >
        <span className={styles.navIcon}>
          {isDark ? (
            <LightThemeIcon size={ICON_SIZE} />
          ) : (
            <DarkThemeIcon size={ICON_SIZE} />
          )}
        </span>
      </CSSTransition>
    </button>
  )
}

export default ThemeSwitch
