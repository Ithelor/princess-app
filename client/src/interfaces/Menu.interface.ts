interface IMenuItem {
  id: number
  name: string
  icon?: React.ReactElement
  goToMenu?: IMenu
}

interface IMenu {
  content: IMenuItem[]
  property?: string
  action?: Function
}

type IMainMenu = Omit<IMenu, 'action, property'>
type ISubMenu = Required<Pick<IMenu, 'content' | 'property' | 'action'>>

export type { IMenuItem, IMainMenu, ISubMenu }
