import React from 'react'
import classNames from 'classnames'
import {
  BsPaletteFill as ThemeIcon,
  BsChatSquareTextFill as OptionOneIcon,
  BsHourglassTop as OptionTwoIcon,
  BsInfoCircleFill as OptionThreeIcon,
  BsStopwatchFill as OptionFourIcon,
  BsCheck as CurrentIcon,
  BsArrowRightCircleFill as OpenIcon
} from 'react-icons/bs'

import Searchbar from 'components/Searchbar/Searchbar'

import { IMenuItem, IMainMenu, ISubMenu } from 'interfaces/Menu.interface'
import { useTheme } from 'hooks/useTheme'
import { useKeyPress } from 'hooks/useKeyPress'
// import MenuReducer from 'reducers/menuReducer'

import styles from './CommandMenu.module.scss'

interface ICommandItem {
  item: IMenuItem
  current?: boolean
  active?: boolean
  onMouseEnter?: React.MouseEventHandler<HTMLLIElement>
}
const CommandItem = (props: ICommandItem) => (
  <li className={classNames({ [styles.active]: props.active })} onMouseEnter={props.onMouseEnter}>
    {props.item.icon || <CurrentIcon visibility={props.current ? 'visible' : 'hidden'} />}
    {props.item.name + (props.item.goToMenu ? '...' : '')}
    {props.item.goToMenu && <OpenIcon />}
  </li>
)

const CommandMenu = () => {
  const { switchTheme } = useTheme()

  const themesMenu: ISubMenu = {
    content: [
      { id: 1, name: 'dark' },
      { id: 2, name: 'iceberg_dark' },
      { id: 3, name: 'laser' },
      { id: 4, name: 'pulse' },
      { id: 5, name: 'sonokai' }
    ],
    property: 'theme',
    action: switchTheme
  }

  const mainMenu: IMainMenu = {
    content: [
      { id: 1, name: 'Theme', icon: <ThemeIcon />, goToMenu: themesMenu },
      { id: 2, name: 'Option 1', icon: <OptionOneIcon /> },
      { id: 3, name: 'Option 2', icon: <OptionTwoIcon /> },
      { id: 4, name: 'Option 3', icon: <OptionThreeIcon /> },
      { id: 5, name: 'Option 4', icon: <OptionFourIcon /> }
    ]
  }

  const [showCommandMenu, setShowCommandMenu] = React.useState(false)
  const [activeMenu, setActiveMenu] = React.useState(mainMenu)

  const escPress = useKeyPress('Escape')
  const upPress = useKeyPress('ArrowUp')
  const downPress = useKeyPress('ArrowDown')
  const enterPress = useKeyPress('Enter')

  // const initialState = { showMenu: false, activeMenu: mainMenu, cursor: 0, current: undefined }
  // const [state, dispatch] = React.useReducer(MenuReducer, initialState)

  const [cursor, setCursor] = React.useState(0)
  const [hovered, setHovered] = React.useState<IMenuItem>()
  const [currentOption, setCurrentOption] = React.useState<string | null>()

  // escPress
  React.useEffect(() => {
    if (escPress) {
      if (!activeMenu.action) {
        setShowCommandMenu(!showCommandMenu)
        setCursor(0)
      } else {
        activeMenu.action?.call(this, currentOption)
        setActiveMenu(mainMenu)
        setCursor(mainMenu.content.findIndex((item) => item.name?.toLowerCase() === activeMenu.property))
      }

      // dispatch({ type: 'escPress', mainMenu: mainMenu })
    }
  }, [escPress]) // eslint-disable-line react-hooks/exhaustive-deps

  // upPress
  React.useEffect(() => {
    if (activeMenu.content.length && upPress && showCommandMenu) {
      const newCursor = cursor > 0 ? cursor - 1 : activeMenu.content.length - 1

      setCursor(newCursor)
      activeMenu.action?.call(this, activeMenu.content[newCursor].name?.toLowerCase())

      // dispatch({ type: 'upPress' })
    }
  }, [upPress]) // eslint-disable-line react-hooks/exhaustive-deps

  // downPress
  React.useEffect(() => {
    if (activeMenu.content.length && downPress && showCommandMenu) {
      const newCursor = cursor < activeMenu.content.length - 1 ? cursor + 1 : 0
      setCursor(newCursor)
      // call action with option name as an argument
      activeMenu.action?.call(this, activeMenu.content[newCursor].name?.toLowerCase())

      // dispatch({ type: 'downPress' })
    }
  }, [downPress]) // eslint-disable-line react-hooks/exhaustive-deps

  // enterPress
  React.useEffect(() => {
    if (activeMenu.content.length && enterPress && showCommandMenu) {
      if (activeMenu.content[cursor].goToMenu) {
        setActiveMenu(activeMenu.content[cursor].goToMenu!)
        setCurrentOption(localStorage.getItem(activeMenu.content[cursor].goToMenu!.property!))

        // set current option active
        setCursor(
          activeMenu.content[cursor].goToMenu!.content.findIndex((item) => {
            return item.name === localStorage.getItem(activeMenu.content[cursor].goToMenu!.property!)
          })
        )
      } else if (activeMenu.action) {
        setActiveMenu(mainMenu)

        // set current menu active
        setCursor(mainMenu.content.findIndex((item) => item.name?.toLowerCase() === activeMenu.property))
      }

      // dispatch({ type: 'enterPress' })
    }
  }, [enterPress]) // eslint-disable-line react-hooks/exhaustive-deps

  // hovered
  React.useEffect(() => {
    if (activeMenu.content.length && hovered) {
      setCursor(activeMenu.content.indexOf(hovered))
      activeMenu.action?.call(this, hovered.name?.toLowerCase())

      // dispatch({ type: 'hovered', hovered: hovered })
    }
  }, [hovered]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    showCommandMenu && (
      <div className={styles.dim} onClick={() => setShowCommandMenu(false)}>
        <menu onClick={(event) => event.stopPropagation()}>
          <Searchbar />
          <ul>
            {activeMenu.content.map((item, index) => (
              <CommandItem
                key={item.id}
                item={item}
                active={index === cursor}
                current={item.name.toLowerCase() === currentOption}
                onMouseEnter={() => {
                  setHovered(item)
                  // dispatch({ type: 'escPress' })
                }}
              />
            ))}
          </ul>
        </menu>
      </div>
    )
  )
}

export default CommandMenu
