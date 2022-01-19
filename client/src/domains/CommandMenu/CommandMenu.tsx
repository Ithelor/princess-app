import React from 'react'

import styles from './CommandMenu.module.scss'

// interface ICommandMenu {}

const CommandMenu = () => {
  const [showCommandMenu, setShowSetthingsMenu] = React.useState(false)

  const handleShowCommandMenu = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowSetthingsMenu(!showCommandMenu)
      }
    },
    [showCommandMenu]
  )

  React.useEffect(() => {
    document.addEventListener('keydown', handleShowCommandMenu)

    return () => {
      document.removeEventListener('keydown', handleShowCommandMenu)
    }
  }, [handleShowCommandMenu])

  return (
    showCommandMenu && (
      <div className={styles.dim}>
        <menu>
          <ul>
            <li>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum quaerat
              enim laboriosam, id obcaecati magnam amet dolores omnis dolore ipsum
              soluta temporibus sit ab assumenda in et maiores non porro.
            </li>
            <li>
              Ipsum qui rem minus quo, amet doloribus similique magni recusandae
              delectus, cumque eaque fugiat ad iure, ab non aliquam veniam voluptas
              molestiae velit accusantium consequatur voluptatem. Nihil debitis
              magnam unde?
            </li>
            <li>
              Impedit harum dolorum vel deserunt delectus rem explicabo nam, ea
              aliquid esse omnis iusto et, illo amet voluptatibus ab? Ratione eveniet
              nobis sapiente assumenda exercitationem fugiat deleniti rerum iste
              beatae.
            </li>
            <li>
              Cupiditate doloribus blanditiis error iusto eum. Corporis sint, nisi
              veniam debitis eius distinctio fuga harum tenetur unde labore. Quo quis
              accusantium amet dolores nostrum? Rerum voluptate ducimus dignissimos
              facilis at?
            </li>
            <li>
              Animi laudantium nesciunt labore neque, ad facilis sequi eius illo
              aperiam consectetur amet est quod. Optio autem, necessitatibus, quos
              commodi aliquid alias ullam eius adipisci nihil, fugiat libero
              dignissimos odio!
            </li>
          </ul>
        </menu>
      </div>
    )
  )
}

export default CommandMenu
