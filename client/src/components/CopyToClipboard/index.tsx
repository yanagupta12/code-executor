import { Modal, Paper, Typography, IconButton } from '@mui/material'
import { useState, useEffect } from 'react'
import './Index.scss'

const CopyToClipboard = ({ rId, rName }: { rId: string; rName: string }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

  useEffect(() => {
    if (rId) {
      setOpen(true)
    }
    setCopied(false)
  }, [rId])

  const handleClose = () => {
    setOpen(false)
  }

  const handleCopyClick = () => {
    if (rId) {
      navigator.clipboard.writeText(rId)
      setCopied(true)
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper>
        <Typography variant="subtitle1" fontWeight={800}>
          {copied
            ? `Room ${rName} Id Copied to Clipboard!`
            : `Room ${rName} Created. Copy Room Id:`}
        </Typography>
        <Typography variant="caption">{rId}</Typography>
        {!copied && (
          <IconButton onClick={handleCopyClick}>
            <i className="fa-regular fa-copy fa-beat-fade fa-xs"></i>
          </IconButton>
        )}
      </Paper>
    </Modal>
  )
}

export default CopyToClipboard
