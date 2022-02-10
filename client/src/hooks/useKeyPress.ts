import React from 'react'

export const useKeyPress = (targetKey: String) => {
  const [keyPressed, setKeyPressed] = React.useState(false)

  React.useEffect(() => {
    const downHandler = (props: { key: String }) => {
      if (props.key === targetKey) setKeyPressed(true)
    }

    const upHandler = (props: { key: String }) => {
      if (props.key === targetKey) setKeyPressed(false)
    }

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [targetKey])

  return keyPressed
}
