import React from 'react'

import styles from './Modal.module.scss'

interface IModal {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: JSX.Element | JSX.Element[]
}

const Modal = (props: IModal) => {
  return (
    <div className={styles.dim} onClick={() => props.setIsModalOpen(false)}>
      <div className={styles.container} onClick={(event) => event.stopPropagation()}>
        {props.children}
      </div>
    </div>
  )
}

export default Modal
