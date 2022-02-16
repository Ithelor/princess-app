import React from 'react'

export const useKeyDown = (targetKey: String, action: () => void) => {
  React.useEffect(() => {
    const downHandler = (props: { key: String }) => {
      if (props.key === targetKey) action()
    }

    window.addEventListener('keydown', downHandler)

    return () => window.removeEventListener('keydown', downHandler)
  }, [action, targetKey])
}
