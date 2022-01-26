import React from 'react'
import {
  BsPaletteFill as ThemeIcon,
  BsChatSquareTextFill as OptionOneIcon,
  BsHourglassTop as OptionTwoIcon,
  BsInfoCircleFill as OptionThreeIcon,
  BsStopwatchFill as OptionFourIcon,
  BsArrowRightCircleFill as GoNext,
  BsArrowLeftCircleFill as GoPrev
} from 'react-icons/bs'

import SearchBar from 'components/SearchBar/SearchBar'

import { useTheme } from 'hooks/useTheme'
import { themes } from 'domains/ThemeProvider/ThemeProvider'

import styles from './CommandMenu.module.scss'

// interface ICommandMenu {}

interface ICommandItem {
  iconLeft?: React.ReactElement
  title?: string
  onClick?: React.MouseEventHandler<HTMLLIElement>
  iconRight?: React.ReactElement
}

const CommandItem = (props: ICommandItem) => {
  return (
    <li onClick={props.onClick}>
      {props.iconLeft}
      {props.title}
      {props.iconRight}
    </li>
  )
}

const CommandMenu = () => {
  const [showCommandMenu, setShowCommandMenu] = React.useState(false)
  const [activeMenu, setActiveMenu] = React.useState('main')

  const { theme, switchTheme } = useTheme()

  const handleShowCommandMenu = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowCommandMenu(!showCommandMenu)
        setActiveMenu('main')
      }
    },
    [showCommandMenu]
  )

  React.useEffect(() => {
    window.addEventListener('keydown', handleShowCommandMenu)

    return () => {
      window.removeEventListener('keydown', handleShowCommandMenu)
    }
  }, [handleShowCommandMenu])

  // TODO: customize the searchbar with search target?
  return (
    showCommandMenu && (
      <div
        className={styles.dim}
        onClick={() => {
          setShowCommandMenu(false)
        }}
      >
        <menu onClick={(event) => event.stopPropagation()}>
          <SearchBar placeholder="Type to search" />
          {activeMenu === 'main' && (
            <ul>
              <CommandItem
                iconLeft={<ThemeIcon />}
                title="Theme"
                onClick={() => setActiveMenu('themes')}
                iconRight={<GoNext />}
              />
              <CommandItem
                iconLeft={<OptionOneIcon />}
                title="Option 1"
                iconRight={<GoNext />}
              />
              <CommandItem
                iconLeft={<OptionTwoIcon />}
                title="Option 2"
                iconRight={<GoNext />}
              />
              <CommandItem
                iconLeft={<OptionThreeIcon />}
                title="Option 3"
                iconRight={<GoNext />}
              />
              <CommandItem
                iconLeft={<OptionFourIcon />}
                title="Option 4"
                iconRight={<GoNext />}
              />
            </ul>
          )}
          {activeMenu === 'themes' && (
            <ul defaultValue={theme} defaultChecked={theme}>
              <CommandItem
                iconLeft={<GoPrev />}
                onClick={() => setActiveMenu('main')}
              />
              {themes.map((item) => (
                <li onClick={switchTheme} key={item}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </menu>
      </div>
    )
  )
}

export default CommandMenu
