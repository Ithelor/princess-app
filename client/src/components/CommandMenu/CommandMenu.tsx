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
import { useKeyDown } from 'hooks/useKeyDown'
import MenuReducer from 'reducers/menuReducer'

import styles from './CommandMenu.module.scss'

/*
 * CommandItem component
 */
interface ICommandItem {
  item: IMenuItem
  current: boolean
  active: boolean
  onMouseEnter: React.MouseEventHandler<HTMLLIElement>
  onClick: () => void
}
const CommandItem = (props: ICommandItem) => (
  <li
    className={classNames({ [styles.active]: props.active })}
    onMouseEnter={props.onMouseEnter}
    onClick={props.onClick}
  >
    {props.item.icon || <CurrentIcon visibility={props.current ? 'visible' : 'hidden'} />}
    {props.item.name + (props.item.goToMenu ? '...' : '')}
    {props.item.goToMenu && <OpenIcon />}
  </li>
)

/*
 * CommandMenu component
 */
// FIXME: cannot update a component (`ThemeProvider`) while rendering a different component (`CommandMenu`)
const CommandMenu = () => {
  const { switchTheme } = useTheme()

  // TODO: ? smh with switchTheme & move to constants
  const themesMenu: ISubMenu = {
    content: [
      { id: 0, name: 'dark' },
      { id: 1, name: 'iceberg_dark' },
      { id: 2, name: 'laser' },
      { id: 3, name: 'pulse' },
      { id: 4, name: 'sonokai' }
    ],
    property: 'theme',
    action: switchTheme
  }

  const mainMenu: IMainMenu = {
    content: [
      { id: 0, name: 'Theme', icon: <ThemeIcon />, goToMenu: themesMenu },
      { id: 1, name: 'Option 1', icon: <OptionOneIcon /> },
      { id: 2, name: 'Option 2', icon: <OptionTwoIcon /> },
      { id: 3, name: 'Option 3', icon: <OptionThreeIcon /> },
      { id: 4, name: 'Option 4', icon: <OptionFourIcon /> }
    ]
  }

  const initialState = { showMenu: false, activeMenu: mainMenu, cursor: 0, current: null }
  const [state, dispatch] = React.useReducer(MenuReducer, initialState)
  const [hovered, setHovered] = React.useState<IMenuItem>()

  React.useEffect(() => {
    if (state.activeMenu!.content.length && hovered) {
      dispatch({ type: 'HOVERED', payload: { hovered: hovered } })
    }
  }, [hovered]) // eslint-disable-line react-hooks/exhaustive-deps

  useKeyDown('ArrowUp', () => dispatch({ type: 'UP_PRESS' }))
  useKeyDown('ArrowDown', () => dispatch({ type: 'DOWN_PRESS' }))
  useKeyDown('Enter', () => dispatch({ type: 'ENTER_PRESS', payload: { mainMenu: mainMenu } }))
  useKeyDown('Escape', () => dispatch({ type: 'ESC_PRESS', payload: { mainMenu: mainMenu } }))

  return (
    state.showMenu && (
      <div className={styles.dim} onClick={() => dispatch({ type: 'OUTER_CLICK' })}>
        <menu onClick={(event) => event.stopPropagation()}>
          <Searchbar />
          <ul>
            {state.activeMenu!.content.map((item, index) => (
              <CommandItem
                key={item.id}
                item={item}
                active={index === state.cursor}
                current={item.id === state.current}
                onMouseEnter={() => setHovered(item)}
                onClick={() => dispatch({ type: 'ENTER_PRESS', payload: { mainMenu: mainMenu } })}
              />
            ))}
          </ul>
        </menu>
      </div>
    )
  )
}

export default CommandMenu
