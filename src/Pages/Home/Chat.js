/* eslint-disable arrow-body-style */
import React from 'react'
import { useParams } from 'react-router'
import {Loader} from 'rsuite'
import ChatTop from '../../Components/chat-window/Top'
import Messages from '../../Components/chat-window/messages'
import ChatBottom from '../../Components/chat-window/Bottom'
import { useRooms } from '../../context/room.context'
import { CurrentRoomProvider } from '../../context/currentroom.context'
import { transferar } from '../../misc/helper,'
import { auth } from '../../misc/firebase'

const Chat = () => {
  const {chatId}=useParams()
  const rooms=useRooms()

  if(!rooms){
    return <Loader center vertical size='md' content="loading" speed='slow'/>
  }
  const currentroom=rooms.find(room=>room.id===chatId)
  if(!currentroom)
  {
    return <h6 className="text-center mt-page">chat {chatId} not found</h6>
  }

  const {name,description}=currentroom;
  const admins=transferar(currentroom.admins)
  const isAdmin=admins.includes(auth.currentUser.uid)

  const Currentroomdata={
    name,description,admins,isAdmin
  }

 
  
  return (
    <CurrentRoomProvider DATa={Currentroomdata}>
    <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </CurrentRoomProvider>
  )
}

export default Chat
