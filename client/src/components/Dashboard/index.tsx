import React from 'react'
import './Index.scss'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Box, Button, Modal, TextField } from '@mui/material'
import CopyToClipboard from '../CopyToClipboard'
import CustomModal from '../CustomModal'

const modelStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: '#30332E',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '10px',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
}

const Dashboard: React.FC = () => {
  const { auth, userData } = useContext(AuthContext)

  if (!auth) {
    return
  }

  const newRoomRef = React.useRef<HTMLInputElement>(null)
  const joinRoomRef = React.useRef<HTMLInputElement>(null)

  const [openCreate, setCreateOpen] = React.useState<boolean>(false)
  const [openJoin, setJoinOpen] = React.useState<boolean>(false)
  const [roomId, setRoomId] = React.useState<string>('')
  const [roomName, setRoomName] = React.useState<string>('')

  const [openCustomModal, setOpenCustomModal] = React.useState<boolean>(false)

  const [message, setMessage] = React.useState<string>('')

  const [status, setStatus] = React.useState<'success' | 'failure' | 'normal'>(
    'normal'
  )

  const handleCreateClose = () => {
    setCreateOpen(false)
  }

  const handleJoinClose = () => {
    setJoinOpen(false)
  }

  const createNewRoom = async () => {
    const roomName = newRoomRef.current?.value
    const data = {
      name: roomName,
    }

    try {
      const response = await fetch(
        'http://localhost:8000/collaborate/create-room/',
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      ).then((res) => res.json())
      setCreateOpen(false)
      setRoomId(response.room_id)
      setRoomName(response.room_name)
    } catch (error) {
      setOpenCustomModal(true)
      setMessage('An error occurred while creating the room')
      console.error('An error occurred:', error)
    }
    console.log(roomName)
  }

  const joinRoom = async () => {
    const roomid = joinRoomRef.current?.value

    const data = {
      room_id: roomid,
    }
    try {
      const response = await fetch(
        'http://localhost:8000/collaborate/join-room/',
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      ).then((res) => res.json())
      setOpenCustomModal(true)
      setMessage(response.message)
      console.log(response)
      if (response.status === 200) setStatus('success')
      else setStatus('failure')
    } catch (error) {
      setOpenCustomModal(true)
      setMessage('An error occurred while joining the room')
      console.error('An error occurred:', error)
    }
    console.log(roomid)
  }

  return (
    <div className="page">
      <h2>
        Welcome to the Dashboard&nbsp;&nbsp;
        <span className="name">{userData.first_name}</span>
      </h2>
      <div>
        <Button onClick={() => setCreateOpen(true)}>Create Room</Button>
        <Modal open={openCreate} onClose={handleCreateClose}>
          <Box sx={{ ...modelStyle }}>
            <div
              style={{
                backgroundColor: '#0A0B0A',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h2>Create Room</h2>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '30px',
                height: '70%',
              }}
            >
              <TextField
                label="Room Name"
                variant="standard"
                inputRef={newRoomRef}
              />
              <Button onClick={createNewRoom}>Create</Button>
            </div>
          </Box>
        </Modal>
        <Button onClick={() => setJoinOpen(true)}>Join Rooms</Button>
        <Modal open={openJoin} onClose={handleJoinClose}>
          <Box sx={{ ...modelStyle }}>
            <div
              style={{
                backgroundColor: '#0A0B0A',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h2 onClick={joinRoom}>Join Room</h2>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '30px',
                height: '70%',
              }}
            >
              <TextField
                label="Room ID"
                variant="standard"
                inputRef={joinRoomRef}
              />
              <Button onClick={joinRoom}>Join</Button>
            </div>
          </Box>
        </Modal>
      </div>

      <CopyToClipboard rId={roomId} rName={roomName} />
      <CustomModal
        open={openCustomModal}
        onClose={() => setOpenCustomModal(false)}
        type={status}
        message={message}
      />

      <div className="rooms">
        <h2>Rooms</h2>

        <div>All the interview room will be listed here</div>
      </div>
    </div>
  )
}

export default Dashboard
