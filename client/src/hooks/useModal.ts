import React from 'react'

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return { isModalOpen, openModal, closeModal }
}

export default useModal
