import React from 'react'
import classNames from 'classnames'
import {
  BsPaletteFill as ThemeIcon,
  BsChatSquareTextFill as OptionOneIcon,
  BsHourglassTop as OptionTwoIcon,
  BsInfoCircleFill as OptionThreeIcon,
  BsStopwatchFill as OptionFourIcon,
  BsArrowRightCircleFill as OpenIcon,
  BsArrowLeftCircleFill as ReturnIcon
} from 'react-icons/bs'

import Searchbar from 'components/Searchbar/Searchbar'

import { useTheme } from 'hooks/useTheme'
import { useKeyPress } from 'hooks/useKeyPress'

import styles from './CommandMenu.module.scss'

// TODO: ? collate IMenu property
interface IMenuItem {
  id: number
  name: string
  icon?: React.ReactElement
  goToMenu?: IMenu
}
interface IMenu {
  content: IMenuItem[]
  action?: Function
  property?: string
}

interface ICommandItem {
  item: IMenuItem
  active?: boolean
  onClick?: React.MouseEventHandler<HTMLLIElement>
}

const CommandMenu = () => {
  const { theme, switchTheme } = useTheme()

  // TODO: smh with switchTheme, want to move to constants
  const themesMenu: IMenu = {
    property: 'theme',
    content: [
      { id: 1, name: 'dark' },
      { id: 2, name: 'iceberg_dark' },
      { id: 3, name: 'laser' },
      { id: 4, name: 'pulse' },
      { id: 5, name: 'sonokai' }
    ],
    action: switchTheme
  }

  const mainMenu: IMenu = {
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

  const CommandItem = (props: ICommandItem) => {
    return (
      <li
        className={classNames({ [styles.active]: props.active })}
        onClick={props.onClick}
        onMouseEnter={() => setHovered(props.item)}
      >
        {props.item.icon}
        {props.item.name + (props.item.goToMenu ? '...' : '')}
        {props.item.goToMenu && <OpenIcon />}
      </li>
    )
  }

  // TODO: ? move to useKeyPress
  // TODO: apply option on enter, use cursor change only for preview, add a tip
  const handleShowCommandMenu = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // FIXME: cursor
        !activeMenu.action && setShowCommandMenu(!showCommandMenu)
        setActiveMenu(mainMenu)
      }
    },
    [showCommandMenu, activeMenu]
  )

  React.useEffect(() => {
    window.addEventListener('keydown', handleShowCommandMenu)

    return () => {
      window.removeEventListener('keydown', handleShowCommandMenu)
    }
  }, [handleShowCommandMenu])

  // TODO: reducer
  const upPress = useKeyPress('ArrowUp')
  const downPress = useKeyPress('ArrowDown')
  const enterPress = useKeyPress('Enter')
  const [cursor, setCursor] = React.useState(0)
  const [hovered, setHovered] = React.useState<IMenuItem>()

  // not including other deps => states update after re-render => can't access the ones needed => retard coding time ↓↓↓

  // upPress
  React.useEffect(() => {
    if (activeMenu.content.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : activeMenu.content.length - 1))

      // call action with option name as an argument
      activeMenu.action?.call(
        this,
        activeMenu.content[cursor > 0 ? cursor - 1 : activeMenu.content.length - 1].name?.toLowerCase()
      )
    }
  }, [upPress])

  // downPress
  React.useEffect(() => {
    if (activeMenu.content.length && downPress) {
      setCursor((prevState) => (prevState < activeMenu.content.length - 1 ? prevState + 1 : 0))

      // call action with option name as an argument
      activeMenu.action?.call(
        this,
        activeMenu.content[cursor < activeMenu.content.length - 1 ? cursor + 1 : 0].name?.toLowerCase()
      )
    }
  }, [downPress])

  // enterPress
  React.useEffect(() => {
    if (activeMenu.content.length && enterPress) {
      if (activeMenu.content[cursor].goToMenu) {
        setActiveMenu(activeMenu.content[cursor].goToMenu!)

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
    }
  }, [enterPress])

  // hovered
  React.useEffect(() => {
    if (activeMenu.content.length && hovered) {
      setCursor(activeMenu.content.indexOf(hovered))
      activeMenu.action?.call(this, hovered.name?.toLowerCase())
    }
  }, [hovered])

  return (
    showCommandMenu && (
      <div
        className={styles.dim}
        onClick={() => {
          setShowCommandMenu(false)
        }}
      >
        <menu onClick={(event) => event.stopPropagation()}>
          <Searchbar />
          <ul>
            {activeMenu.content.map((item, index) => (
              <CommandItem key={item.id} item={item} active={index === cursor} />
            ))}
          </ul>
        </menu>
      </div>
    )
  )
}

export default CommandMenu
