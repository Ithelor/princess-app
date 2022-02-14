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

import { useTheme } from 'hooks/useTheme'
import { useKeyPress } from 'hooks/useKeyPress'

import styles from './CommandMenu.module.scss'

// TODO: ? collate IMenu's property
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
  current?: boolean
  active?: boolean
}

const CommandMenu = () => {
  const { switchTheme } = useTheme()

  // TODO: smh with switchTheme, want to move to constants
  const mainMenu: IMenu = {
    content: [
      {
        id: 1,
        name: 'Theme',
        icon: <ThemeIcon />,
        goToMenu: {
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
      },
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
      <li className={classNames({ [styles.active]: props.active })} onMouseEnter={() => setHovered(props.item)}>
        {props.item.icon || <CurrentIcon visibility={props.current ? 'visible' : 'hidden'} />}
        {props.item.name + (props.item.goToMenu ? '...' : '')}
        {props.item.goToMenu && <OpenIcon />}
      </li>
    )
  }

  // TODO: reducer
  const escPress = useKeyPress('Escape')
  const upPress = useKeyPress('ArrowUp')
  const downPress = useKeyPress('ArrowDown')
  const enterPress = useKeyPress('Enter')
  const [currentOption, setCurrentOption] = React.useState<string | null>()
  const [cursor, setCursor] = React.useState(0)
  const [hovered, setHovered] = React.useState<IMenuItem>()

  // not including other deps => states update after re-render => can't access the ones needed => retard coding time ↓↓↓

  // escPress
  React.useEffect(() => {
    if (escPress) {
      if (!activeMenu.action) setShowCommandMenu(!showCommandMenu)

      activeMenu.action?.call(this, currentOption)
      // FIXME: cursor
      setCursor(0)
      setActiveMenu(mainMenu)
    }
  }, [escPress])

  // upPress
  React.useEffect(() => {
    if (activeMenu.content.length && upPress) {
      const newCursor = cursor > 0 ? cursor - 1 : activeMenu.content.length - 1

      setCursor(newCursor)
      // call action with option name as an argument
      activeMenu.action?.call(this, activeMenu.content[newCursor].name?.toLowerCase())
    }
  }, [upPress])

  // downPress
  React.useEffect(() => {
    if (activeMenu.content.length && downPress) {
      const newCursor = cursor < activeMenu.content.length - 1 ? cursor + 1 : 0

      setCursor(newCursor)
      // call action with option name as an argument
      activeMenu.action?.call(this, activeMenu.content[newCursor].name?.toLowerCase())
    }
  }, [downPress])

  // enterPress
  React.useEffect(() => {
    if (activeMenu.content.length && enterPress) {
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
              />
            ))}
          </ul>
        </menu>
      </div>
    )
  )
}

export default CommandMenu
