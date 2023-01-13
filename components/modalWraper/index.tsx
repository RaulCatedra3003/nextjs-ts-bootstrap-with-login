export interface ModalWraperProps {
  children: React.ReactNode
  handleOpen: () => void
}

export default function ModalWraper({children, handleOpen}: ModalWraperProps) {

  function handleCloseModal (e: React.MouseEvent<HTMLElement>) {
    const target = e.target as Element
    if(target.className === 'modal-wraper') {
      handleOpen()
    }
  }

  return (
    <button className='modal-wraper' onClick={handleCloseModal}>
      {children}
    </button>
  )
}