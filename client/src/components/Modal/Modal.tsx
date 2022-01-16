import React from 'react'
import { BsXCircleFill as ExitIcon } from 'react-icons/bs'

import styles from './Modal.module.scss'

interface ModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  showExit?: PropertyKey
  showClose?: PropertyKey
  title: String
  content: String
}

const Modal = (props: ModalProps) => {
  return (
    <>
      <div className={styles.dim} onClick={() => props.setIsOpen(false)}>
        <div className={styles.container}>
          <h5 className={styles.heading}>{props.title}</h5>
          {props.showExit && (
            <button
              className={styles.exitBtn}
              onClick={() => props.setIsOpen(false)}
            >
              <ExitIcon />
            </button>
          )}
          <div className={styles.content}>{props.content}</div>
          {props.showClose && (
            <button
              className={styles.closeBtn}
              onClick={() => props.setIsOpen(false)}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Modal
