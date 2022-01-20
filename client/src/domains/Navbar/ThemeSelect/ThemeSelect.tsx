import { useTheme } from 'hooks/useTheme'

import DropdownSelect from 'components/DropdownSelect/DropdownSelect'

export const themes: Array<string> = [
  'dark',
  'iceberg_dark',
  'laser',
  'pulse',
  'sonokai'
]

const ThemeSelect = () => {
  const { theme, switchTheme } = useTheme()

  return <DropdownSelect list={themes} onChange={switchTheme} current={theme} />
}

export default ThemeSelect
