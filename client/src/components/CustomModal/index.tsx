import React from 'react'
import { Modal, Typography } from '@mui/material'

interface CustomModalProps {
  type: 'success' | 'failure' | 'normal'
  message: string
  open: boolean
  onClose: () => void
}

const CustomModal: React.FC<CustomModalProps> = ({
  type,
  message,
  open,
  onClose,
}) => {
  let textColor: string

  switch (type) {
    case 'success':
      textColor = 'green'
      break
    case 'failure':
      textColor = 'red'
      break
    case 'normal':
    default:
      textColor = 'black'
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ backgroundColor: 'white', padding: '16px' }}>
        <Typography style={{ color: textColor }}>{message}</Typography>
      </div>
    </Modal>
  )
}

export default CustomModal
