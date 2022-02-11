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

interface IMenuItem {
  id: number
  name: string
  icon?: React.ReactElement
  children?: IMenu
}
interface IMenu {
  content: IMenuItem[]
  action?: Function
}

interface ICommandItem {
  item: IMenuItem
  active?: boolean
  onClick?: React.MouseEventHandler<HTMLLIElement>
}

const CommandMenu = () => {
  const { theme, switchTheme } = useTheme()

  // TODO: smh with switchTheme, want to move to constants
  const themes: IMenu = {
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
      { id: 1, name: 'Themes', icon: <ThemeIcon />, children: themes },
      { id: 2, name: 'Option 1', icon: <OptionOneIcon /> },
      { id: 3, name: 'Option 2', icon: <OptionTwoIcon /> },
      { id: 4, name: 'Option 3', icon: <OptionThreeIcon /> },
      { id: 5, name: 'Option 4', icon: <OptionFourIcon /> }
    ]
  }

  const [showCommandMenu, setShowCommandMenu] = React.useState(false)
  const [activeMenu, setActiveMenu] = React.useState(mainMenu)

  const CommandItem = (props: ICommandItem) => {
    // TODO: <ReturnIcon />
    return (
      <li
        className={classNames({ [styles.active]: props.active })}
        onClick={props.onClick}
        onMouseEnter={() => setHovered(props.item)}
      >
        {props.item.icon}
        {props.item.name + (props.item.children ? '...' : '')}
        {props.item.children && <OpenIcon />}
      </li>
    )
  }

  // TODO: ? move to useKeyPress
  const handleShowCommandMenu = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowCommandMenu(!showCommandMenu)
        setActiveMenu(mainMenu)
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

  // TODO: reducer
  const upPress = useKeyPress('ArrowUp')
  const downPress = useKeyPress('ArrowDown')
  const enterPress = useKeyPress('Enter')
  const [cursor, setCursor] = React.useState(0)
  const [hovered, setHovered] = React.useState<IMenuItem>()

  React.useEffect(() => {
    if (activeMenu.content.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : activeMenu.content.length - 1))
    }
  }, [upPress])

  React.useEffect(() => {
    if (activeMenu.content.length && downPress) {
      setCursor((prevState) => (prevState < activeMenu.content.length - 1 ? prevState + 1 : 0))
    }
  }, [downPress])

  React.useEffect(() => {
    if (activeMenu.content.length && enterPress) {
      if (activeMenu.content[cursor].children) setActiveMenu(activeMenu.content[cursor].children!)
      else if (activeMenu.action) {
        // TODO: if action, open on current option
        // TODO: when return, open on last menuItem
        setActiveMenu(mainMenu)
        setCursor(0)
      }
    }
  }, [enterPress])

  React.useEffect(() => {
    if (activeMenu.content.length && hovered) {
      setCursor(activeMenu.content.indexOf(hovered))
      activeMenu.action?.call(this, hovered.name.toLowerCase())
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
          <Searchbar placeholder="Type to search" />
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
