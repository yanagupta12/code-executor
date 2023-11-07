import React from 'react'
import { Card, CardHeader, Avatar, Chip } from '@mui/material'

interface CardData {
  id: number
  room_id: string
  name: string
  owner: string | null
}

const CustomCard: React.FC<{ data: CardData; userEmail: string }> = ({
  data,
  userEmail,
}) => {

  const sanitizedUserEmail = userEmail.replace(/^"(.*)"$/, '$1')

  const isOwner = data.owner === sanitizedUserEmail

  const cardStyle: React.CSSProperties = {
    minWidth: 450,
    maxWidth: 500, 
    margin: '16px',
    backgroundColor: isOwner ? 'lightblue' : 'white',
    position: 'relative',
  }


  const avatarStyle: React.CSSProperties = {
    backgroundColor: isOwner ? 'orange' : 'primary',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
  }


  const chipStyle: React.CSSProperties = {
    position: 'absolute',
    top: '8px',
    right: '8px',
  }


  return (
    <Card style={cardStyle}>
      <CardHeader
        avatar={
          <Avatar aria-label="Card" style={avatarStyle}>
            {data.name[0].toUpperCase()}
          </Avatar>
        }
        title={data.name}
        subheader={`Room ID: ${data.room_id}`}
      />
      <div style={chipStyle}>
        <Chip
          label={isOwner ? 'Owner' : 'Member'}
          size="small"
          color={isOwner ? 'secondary' : 'primary'}
        />
      </div>
    </Card>
  )
  
}

export default CustomCard
