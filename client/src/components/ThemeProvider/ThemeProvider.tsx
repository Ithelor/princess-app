import React from 'react'

import { ThemeContext } from 'context/ThemeContext'

interface IThemeProvider {
  children: React.ReactChildren
}

export const ThemeProvider = (props: IThemeProvider) => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches && 'dark') ||
      'light'
  )

  const switchTheme = (e: React.ChangeEvent<HTMLSelectElement> | null) => {
    if (e) setTheme(e.target.value)

    localStorage.setItem('theme', theme!)

    const head = document.getElementsByTagName('head')[0]
    let link = document.getElementById('theme') as HTMLLinkElement

    if (link) {
      link.id = 'theme'
      head.removeChild(link)

      link = document.createElement('link')
      link.id = 'theme'
      link.rel = 'stylesheet'
      link.href = `themes/${theme}.css`
      head.appendChild(link)
    } else {
      link = document.createElement('link')
      link.id = 'theme'
      link.rel = 'stylesheet'
      link.href = `themes/${theme}.css`
      head.appendChild(link)
    }
  }

  switchTheme(null)

  return (
    <div data-theme={theme}>
      <ThemeContext.Provider value={{ theme, switchTheme }}>
        {props.children}
      </ThemeContext.Provider>
    </div>
  )
}
