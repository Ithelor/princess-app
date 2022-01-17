import { useTheme } from 'hooks/useTheme'

import DropdownSelect from 'components/DropdownSelect/DropdownSelect'

const themes: Array<string> = ['sonokai', 'pulse', 'laser']

const ThemeSwitch = () => {
  const { theme, switchTheme } = useTheme()

  return <DropdownSelect list={themes} onChange={switchTheme} current={theme} />
}

export default ThemeSwitch
