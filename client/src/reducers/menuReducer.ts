import React from 'react'
import { IMenuItem, IMainMenu, ISubMenu } from 'interfaces/Menu.interface'

type State = {
  showMenu: boolean
  activeMenu: IMainMenu | ISubMenu
  filteredMenu: IMainMenu | ISubMenu | null
  cursor: number
  current: number | null
  searchResult: IMenuItem[] | []
}

type Action =
  | { type: 'HOVERED'; payload: { hovered: IMenuItem } }
  | { type: 'OUTER_CLICK'; payload: { mainMenu: IMainMenu } }
  | { type: 'UP_PRESS' | 'DOWN_PRESS' | 'SEARCH_CHANGE'; payload: { searchRef: React.RefObject<HTMLInputElement> } }
  | {
      type: 'ESC_PRESS' | 'ENTER_PRESS'
      payload: { mainMenu: IMainMenu; searchRef: React.RefObject<HTMLInputElement> }
    }

const findCurrentMenu = (content: IMenuItem[], property: string) => {
  return content.findIndex((item) => item.name.toLowerCase() === property)
}

const findCurrentOption = (menu: IMainMenu | ISubMenu) => {
  return menu.content.findIndex((item) => item.name === localStorage.getItem(menu.property!))
}

const findCurrent = (state: State, payload: { mainMenu: IMainMenu }) => {
  return state.activeMenu.content[state.cursor].goToMenu
    ? findCurrentOption(state.activeMenu.content[state.cursor].goToMenu!)
    : state.activeMenu.property
    ? findCurrentMenu(payload.mainMenu.content, state.activeMenu.property!)
    : state.cursor
}

const callAction = (activeMenu: IMainMenu | ISubMenu, index: number) => {
  const option = activeMenu.content[index].name?.toLowerCase()

  return localStorage.getItem(activeMenu.property!) !== option && activeMenu.action?.call(activeMenu, option)
}

const clearSearch = (state: State, payload: { searchRef: React.RefObject<HTMLInputElement> }) => {
  if (payload.searchRef.current) {
    state.searchResult = []
    state.filteredMenu = null
    payload.searchRef.current!.value = ''
  }
}

export default function MenuReducer(state: State, action: Action): State {
  let cursorPos

  switch (action.type) {
    case 'SEARCH_CHANGE':
      const newFilteredMenu =
        state.searchResult && action.payload.searchRef.current?.value.length
          ? { ...state.activeMenu, content: state.searchResult }
          : state.activeMenu

      newFilteredMenu.content.length && state.activeMenu.action && callAction(newFilteredMenu, 0)

      return {
        ...state,
        filteredMenu: newFilteredMenu,
        cursor: 0
      }

    case 'OUTER_CLICK':
      state.activeMenu.action && callAction(state.activeMenu, state.current || 0)

      return {
        ...state,
        showMenu: false,
        activeMenu: action.payload.mainMenu
      }

    case 'ESC_PRESS':
      state.activeMenu.action && callAction(state.activeMenu, state.current || 0)

      if (action.payload.searchRef.current) action.payload.searchRef.current.value = ''

      clearSearch(state, action.payload)

      return {
        ...state,
        showMenu: state.activeMenu.action ? state.showMenu : !state.showMenu,
        cursor: state.activeMenu.action
          ? findCurrentMenu(action.payload.mainMenu.content, state.activeMenu.property!)
          : 0,
        activeMenu: state.activeMenu.action ? action.payload.mainMenu : state.activeMenu
      }

    case 'UP_PRESS':
      cursorPos =
        state.cursor > 0
          ? state.cursor - 1
          : (state.filteredMenu?.content.length || state.activeMenu.content.length) - 1
      ;(state.searchResult.length > 0 || !action.payload.searchRef.current?.value) &&
        callAction(state.filteredMenu || state.activeMenu, cursorPos)

      return {
        ...state,
        cursor: cursorPos
      }

    case 'DOWN_PRESS':
      cursorPos =
        state.cursor < (state.filteredMenu?.content.length || state.activeMenu.content.length) - 1
          ? state.cursor + 1
          : 0
      ;(state.searchResult.length > 0 || !action.payload.searchRef.current?.value) &&
        callAction(state.filteredMenu || state.activeMenu, cursorPos)

      return {
        ...state,
        cursor: cursorPos
      }

    case 'ENTER_PRESS':
      clearSearch(state, action.payload)

      return {
        ...state,
        activeMenu: state.activeMenu.content[state.cursor].goToMenu || action.payload.mainMenu,
        cursor: findCurrent(state, action.payload),
        current: findCurrent(state, action.payload)
      }

    case 'HOVERED':
      // FIXME: reset on other actions
      callAction(state.activeMenu, action.payload.hovered.id)

      return {
        ...state,
        cursor: (state.filteredMenu || state.activeMenu).content.indexOf(action.payload.hovered)
      }

    default:
      throw new Error()
  }
}
