import React, { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  addMessage,
  setUserStatus,
  setStatus,
  setMessagePin,
  newUserLogin
} from '@redux/messageSlice'
import { SERVER_IP_ADDRESS, SERVER_SOCKET_PORT } from '@constants/config'

export const WebSocketContext = createContext(null)

export const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch()
  const [socket, setSocket] = useState({ readyState: null })
  const [message, setMessage] = useState('')
  const [logout, setLogout] = useState(false)

  useEffect(() => {
    const socketUrl = `ws://${SERVER_IP_ADDRESS}:${SERVER_SOCKET_PORT}/ws`
    try {
      const ws = new WebSocket(
        `ws://127.0.0.1:3000/ws`
        // socketUrl
      )

      ws.onopen = () => {
        console.log('WebSocket connection established.')
        setSocket(ws)
      }
  
      ws.onmessage = event => {
        setMessage(event.data)
        const data = JSON.parse(event.data)
        console.log(data)
        if (data.type === 'message') {
          dispatch(
            addMessage({ room: data.room, data: data.data, type: 'receive' })
          )
          dispatch(setStatus(0))
        }
        if (data.type === 'status') dispatch(setStatus(Number(data.data || 0)))
        if (data.type === 'login') dispatch(newUserLogin(data))
        if (data.type === 'user-status') dispatch(setUserStatus(data))
        if (data.type === 'pin') dispatch(setMessagePin(data.data))
      }
  
      return () => {
        ws.close()
      }
    } catch (err) {
      console.log(`Error while connecting socket`)
      console.log(err)
    }
    
  }, [dispatch, logout])

  return (
    <WebSocketContext.Provider value={{ socket, message, setLogout }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => useContext(WebSocketContext)
