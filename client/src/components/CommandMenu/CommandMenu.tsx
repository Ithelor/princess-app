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

import Searchbar from 'components/Searchbar/Searchbar'

import { useTheme } from 'hooks/useTheme'
import { useKeyPress } from 'hooks/useKeyPress'
import { themes } from 'layouts/ThemeProvider/ThemeProvider'
// import reducer from 'reducers/keyReducer'

import styles from './CommandMenu.module.scss'
import classNames from 'classnames'

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

  const initialState = { selectedIndex: 0 }
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const arrowUpPressed = useKeyPress('ArrowUp')
  const arrowDownPressed = useKeyPress('ArrowDown')

  React.useEffect(() => {
    if (arrowUpPressed) dispatch({ type: 'arrowUp' })
  }, [arrowUpPressed])

  React.useEffect(() => {
    if (arrowDownPressed) dispatch({ type: 'arrowDown' })
  }, [arrowDownPressed])

  function reducer(state: { selectedIndex: number }, action: { type: String; payload?: any }) {
    let selectedIndex

    switch (action.type) {
      case 'arrowUp':
        selectedIndex = state.selectedIndex !== 0 ? state.selectedIndex - 1 : themes.length - 1

        switchTheme(themes[selectedIndex])
        return {
          selectedIndex
        }
      case 'arrowDown':
        selectedIndex = state.selectedIndex !== themes.length - 1 ? state.selectedIndex + 1 : 0

        switchTheme(themes[selectedIndex])
        return {
          selectedIndex
        }
      case 'select':
        return { selectedIndex: action.payload }
      default:
        throw new Error()
    }
  }

  return (
    showCommandMenu && (
      <div
        className={styles.dim}
        onClick={() => {
          setShowCommandMenu(false)
        }}
      >
        <menu onClick={(event) => event.stopPropagation()}>
          <Searchbar placeholder="Type to search" />
          {activeMenu === 'main' && (
            <ul>
              <CommandItem
                iconLeft={<ThemeIcon />}
                title="Theme"
                onClick={() => setActiveMenu('themes')}
                iconRight={<GoNext />}
              />
              <CommandItem iconLeft={<OptionOneIcon />} title="Option 1" iconRight={<GoNext />} />
              <CommandItem iconLeft={<OptionTwoIcon />} title="Option 2" iconRight={<GoNext />} />
              <CommandItem iconLeft={<OptionThreeIcon />} title="Option 3" iconRight={<GoNext />} />
              <CommandItem iconLeft={<OptionFourIcon />} title="Option 4" iconRight={<GoNext />} />
            </ul>
          )}
          {activeMenu === 'themes' && (
            <ul defaultValue={theme} defaultChecked={theme}>
              <CommandItem iconLeft={<GoPrev />} onClick={() => setActiveMenu('main')} />
              {themes.map((item, index) => (
                <li
                  key={item}
                  className={classNames({ [styles.active]: index === state.selectedIndex })}
                  onClick={() => switchTheme(item)}
                >
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

export default CommandMenu
