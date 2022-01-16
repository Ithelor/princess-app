import React from 'react'

import { ThemeContext } from 'context/ThemeContext'

interface ThemeProviderProps {
  children: React.ReactChildren
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState(localStorage.getItem('theme'))

  const switchTheme = () => {
    if (theme === 'dark') {
      document.body.classList.replace('dark', 'light')
      localStorage.setItem('theme', 'light')
      setTheme('light')
    } else {
      document.body.classList.replace('light', 'dark')
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    }
  }

  return (
    <div data-theme={theme}>
      <ThemeContext.Provider value={{ theme, switchTheme }}>
        {props.children}
      </ThemeContext.Provider>
    </div>
  )
}
