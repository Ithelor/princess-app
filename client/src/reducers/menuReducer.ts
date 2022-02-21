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
  | { type: 'HOVER'; payload: { hovered: IMenuItem } }
  | { type: 'SEARCH_CHANGE' | 'UP_PRESS' | 'DOWN_PRESS'; payload: { searchRef: React.RefObject<HTMLInputElement> } }
  | {
      type: 'ENTER_PRESS' | 'ESC_PRESS' | 'OUTER_CLICK'
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
  if (activeMenu.action) {
    const option = activeMenu.content[index].name?.toLowerCase()
    return localStorage.getItem(activeMenu.property!) !== option && activeMenu.action?.call(activeMenu, option)
  }
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
    case 'HOVER':
      callAction(state.activeMenu, action.payload.hovered.id)

      return {
        ...state,
        cursor: (state.filteredMenu || state.activeMenu).content.indexOf(action.payload.hovered)
      }

    case 'SEARCH_CHANGE':
      const newFilteredMenu =
        state.searchResult && action.payload.searchRef.current?.value.length
          ? { ...state.activeMenu, content: state.searchResult }
          : state.activeMenu

      if (newFilteredMenu.content.length > 0) callAction(newFilteredMenu, 0)
      else callAction(state.activeMenu, state.current || 0)

      return {
        ...state,
        filteredMenu: newFilteredMenu,
        cursor: 0
      }

    case 'UP_PRESS':
      cursorPos =
        state.cursor > 0
          ? state.cursor - 1
          : (state.filteredMenu?.content.length || state.activeMenu.content.length) - 1

      if (state.searchResult.length > 0 || !action.payload.searchRef.current?.value)
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

      if (state.searchResult.length > 0 || !action.payload.searchRef.current?.value)
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

    case 'ESC_PRESS':
      callAction(state.activeMenu, state.current || 0)
      clearSearch(state, action.payload)

      return {
        ...state,
        showMenu: state.activeMenu.action ? state.showMenu : !state.showMenu,
        cursor: state.activeMenu.action
          ? findCurrentMenu(action.payload.mainMenu.content, state.activeMenu.property!)
          : 0,
        activeMenu: state.activeMenu.action ? action.payload.mainMenu : state.activeMenu
      }

    case 'OUTER_CLICK':
      callAction(state.activeMenu, state.current || 0)
      clearSearch(state, action.payload)

      return {
        ...state,
        showMenu: false,
        activeMenu: action.payload.mainMenu
      }

    default:
      throw new Error()
  }
}
