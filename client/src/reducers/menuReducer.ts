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
  | { type: 'UP_PRESS' | 'DOWN_PRESS'; payload: { searchRef: React.RefObject<HTMLInputElement> } }
  | {
      type: 'ENTER_PRESS' | 'ESC_PRESS' | 'OUTER_CLICK' | 'SEARCH_CHANGE'
      payload: { mainMenu: IMainMenu; searchRef: React.RefObject<HTMLInputElement> }
    }

const findCurrentMenu = (content: IMenuItem[], property: string) => {
  return content.findIndex((item) => item.name.toLowerCase() === property)
}

const findCurrentOption = (menu: IMainMenu | ISubMenu) => {
  return menu.content.findIndex((item) => item.name === localStorage.getItem(menu.property!))
}

const findCurrent = (state: State, mainMenu: IMainMenu) => {
  return state.activeMenu.content[state.cursor].goToMenu
    ? findCurrentOption(state.activeMenu.content[state.cursor].goToMenu!)
    : state.activeMenu.property
    ? findCurrentMenu(mainMenu.content, state.activeMenu.property!)
    : state.cursor
}

// NOTE: test lastOption functioning on multiple menus
let lastOption = ''
const callAction = (activeMenu: IMainMenu | ISubMenu, index: number) => {
  if (activeMenu.action) {
    const option = activeMenu.content[index].name?.toLowerCase()

    lastOption !== option && activeMenu.action?.call(activeMenu, option)
    lastOption = option
  }
}

const clearSearch = (state: State, searchRef: React.RefObject<HTMLInputElement>) => {
  if (searchRef.current) {
    state.searchResult = []
    state.filteredMenu = null
    searchRef.current!.value = ''
  }
}

const saveOption = (state: State) => {
  state.activeMenu.action &&
    localStorage.setItem(state.activeMenu.property!, state.activeMenu.content[state.cursor].name?.toLowerCase())
}

export default function MenuReducer(state: State, action: Action): State {
  let newCursor: number, newFilteredMenu

  switch (action.type) {
    case 'HOVER':
      callAction(state.activeMenu, action.payload.hovered.id)

      return {
        ...state,
        cursor: (state.filteredMenu || state.activeMenu).content.indexOf(action.payload.hovered)
      }

    case 'UP_PRESS':
      newCursor =
        state.cursor > 0
          ? state.cursor - 1
          : (state.filteredMenu?.content.length || state.activeMenu.content.length) - 1

      if (state.searchResult.length > 0 || !action.payload.searchRef.current?.value)
        callAction(state.filteredMenu || state.activeMenu, newCursor)

      return {
        ...state,
        cursor: newCursor
      }

    case 'DOWN_PRESS':
      newCursor =
        state.cursor < (state.filteredMenu?.content.length || state.activeMenu.content.length) - 1
          ? state.cursor + 1
          : 0

      if (state.searchResult.length > 0 || !action.payload.searchRef.current?.value)
        callAction(state.filteredMenu || state.activeMenu, newCursor)

      return {
        ...state,
        cursor: newCursor
      }

    case 'ENTER_PRESS':
      saveOption(state)
      clearSearch(state, action.payload.searchRef)

      return {
        ...state,
        activeMenu: state.activeMenu.content[state.cursor].goToMenu || action.payload.mainMenu,
        cursor: findCurrent(state, action.payload.mainMenu),
        current: findCurrent(state, action.payload.mainMenu)
      }

    case 'ESC_PRESS':
      newCursor = state.activeMenu.action
        ? findCurrentMenu(action.payload.mainMenu.content, state.activeMenu.property!)
        : 0

      callAction(state.activeMenu, state.current || 0)
      clearSearch(state, action.payload.searchRef)

      return {
        ...state,
        showMenu: state.activeMenu.action ? state.showMenu : !state.showMenu,
        cursor: newCursor,
        activeMenu: state.activeMenu.action ? action.payload.mainMenu : state.activeMenu
      }

    case 'OUTER_CLICK':
      callAction(state.activeMenu, state.current || 0)
      clearSearch(state, action.payload.searchRef)

      return {
        ...state,
        showMenu: false,
        activeMenu: action.payload.mainMenu
      }

    case 'SEARCH_CHANGE':
      newFilteredMenu =
        state.searchResult && action.payload.searchRef.current?.value.length
          ? { ...state.activeMenu, content: state.searchResult }
          : state.activeMenu

      newCursor =
        state.activeMenu.action && !action.payload.searchRef.current?.value.length
          ? findCurrentOption(state.activeMenu)
          : 0

      if (state.searchResult.length > 0 || !action.payload.searchRef.current?.value)
        callAction(newFilteredMenu, newCursor)
      else callAction(state.activeMenu, findCurrentOption(state.activeMenu) ?? 0)

      return {
        ...state,
        filteredMenu: newFilteredMenu,
        cursor: newCursor
      }

    default:
      throw new Error()
  }
}
