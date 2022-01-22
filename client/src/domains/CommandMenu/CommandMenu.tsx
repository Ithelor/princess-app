import React from 'react'
import {
  BsPaletteFill as ThemeIcon,
  BsChatSquareTextFill as OptionOneIcon,
  BsHourglassTop as OptionTwoIcon,
  BsInfoCircleFill as OptionThreeIcon,
  BsStopwatchFill as OptionFourIcon,
  BsArrowRightCircleFill as GoToIcon
} from 'react-icons/bs'

import SearchBar from 'components/SearchBar/SearchBar'

import styles from './CommandMenu.module.scss'

// interface ICommandMenu {}

interface ICommandItem {
  title: string
  icon: React.ReactElement
  goToMenu?: string
}

const CommandItem = (props: ICommandItem) => {
  return (
    <li>
      {props.icon}
      {props.title}
      {<GoToIcon />}
    </li>
  )
}

const CommandMenu = () => {
  // const [activeMenu, setActiveMenu] = React.useState('main')

  const [showCommandMenu, setShowCommandMenu] = React.useState(false)

  const handleShowCommandMenu = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowCommandMenu(!showCommandMenu)
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

  // TODO: customize the searchbar with search target?
  return (
    showCommandMenu && (
      <div className={styles.dim} onClick={() => setShowCommandMenu(false)}>
        <menu onClick={(event) => event.stopPropagation()}>
          <SearchBar placeholder="Type to search" />
          <ul>
            <CommandItem title="Theme" icon={<ThemeIcon />} />
            <CommandItem title="Option 1" icon={<OptionOneIcon />} />
            <CommandItem title="Option 2" icon={<OptionTwoIcon />} />
            <CommandItem title="Option 3" icon={<OptionThreeIcon />} />
            <CommandItem title="Option 4" icon={<OptionFourIcon />} />
          </ul>
        </menu>
      </div>
    )
  )
}

export default CommandMenu
