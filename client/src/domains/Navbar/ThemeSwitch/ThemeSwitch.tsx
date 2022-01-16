import { BsSun as LightThemeIcon, BsMoon as DarkThemeIcon } from 'react-icons/bs'

import { useTheme } from 'hooks/useTheme'

import styles from './ThemeSwitch.module.scss'
import 'styles/index.scss'

const ICON_SIZE = 24

const ThemeSwitch = () => {
  // const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  const { theme, switchTheme } = useTheme()

  document.body.classList.add(theme === 'dark' ? 'dark' : 'light')

  return (
    <button className={styles.themeSwitch} onClick={() => switchTheme()}>
      <span className={styles.navIcon}>
        {theme === 'dark' ? (
          <DarkThemeIcon size={ICON_SIZE} />
        ) : (
          <LightThemeIcon size={ICON_SIZE} />
        )}
      </span>
    </button>
  )
}

export default ThemeSwitch
