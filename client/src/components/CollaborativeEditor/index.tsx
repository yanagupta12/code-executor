import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Room = () => {
  const { room_id } = useParams()
  const [roomData, setRoomData] = useState(null)
  const sanitizedRoomId = room_id!.replace(/^"(.*)"$/, '$1')
  // const [socket, setSocket] = useState<WebSocket>()

  useEffect(() => {
    const URL = 'http://localhost:8001/collaborate/get-room-by-id?room_id='
    const fetchData = async () => {
      try {
        const response = await fetch(URL + sanitizedRoomId, {
          method: 'GET',
          credentials: 'include',
        })
        const data = await response.json()
        if ( data.data.length == 1) {
          setRoomData(data.data[0])
          return
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [room_id])



  // useEffect(() => {
  //   // Socket URL
  //   const socketUrl = "ws://localhost:8000/ws/me/"
  //   console.log(socketUrl + room_id)
  //   const newSocket = new WebSocket(socketUrl );
  //   setSocket(newSocket);

  //   newSocket.addEventListener('open', (event) => {
  //     console.log("Websocket Connection established 🥳")
  //     console.log('WebSocket connection opened:', event);
  //   });

  //   newSocket.addEventListener('close', (event) => {
  //     console.log('WebSocket connection closed:', event);
  //   });

  //   newSocket.addEventListener('error', (error) => {
  //     console.error('WebSocket error:', error);
  //   });

  //   // return () => {
  //   //   newSocket.close();
  //   // };
  // }, []);


  if (!roomData) return

  return (
    <div>
      <h1>This is room with id {room_id}</h1>
      {roomData && <div>
        {/* Room data here */}
        </div>}
    </div>
  )
}

export default Room
