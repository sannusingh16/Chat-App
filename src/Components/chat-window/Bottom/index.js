/* eslint-disable arrow-body-style */
import React, { useCallback, useState } from 'react'
import {InputGroup,Input,Icon, Alert} from 'rsuite'
import firebase from 'firebase/app'
import { useParams } from 'react-router'
import { useProfile } from '../../../context/profile.context'
import { database } from '../../../misc/firebase'

function assemblemsg(profile,chatId) {
  return {
    roomId:chatId,
    author:{
      name:profile.name,
      uid:profile.uid,
      createdAt:profile.createdAt,
      ...(profile.avatar? {avatar:profile.avatar}:{})

    },
    createdAt:firebase.database.ServerValue.TIMESTAMP
  }
}

const Bottom = () => {
  const [input,setinput]=useState('')
  const {profile}=useProfile()
  const {chatId}=useParams()
  const [isloading,setisloading]=useState(false)

  const oninput=useCallback((value)=>{
     setinput(value)
  },[])

  const onSendclick=async()=>{

    if(input.trim()==='')
    {
      return ;
    }
    const msgdata=assemblemsg(profile,chatId)
    msgdata.text=input;
    const updates={};

    const messageId=database.ref('messages').push().key;

    updates[`/messages/${messageId}`]=msgdata
    updates[`/rooms/${chatId}/lastmessage`]={
      ...msgdata,msgId:messageId
    }
    setisloading(true)
    try {
      await database.ref().update(updates);
      setinput('')
      setisloading(false)
      
    } catch (err) {
      Alert.error(err.messgage)
      setisloading(false)
    }

  }

  const onKeyDown=(ev)=>{
    if(ev.keyCode === 13){
      ev.preventDefault()
      onSendclick()
    }
  }

  return (
    <div>
     <InputGroup>
       <Input placeholder="Write your messages..." value={input} onChange={oninput} onKeyDown={onKeyDown} />
       <InputGroup.Button appearance='primary' color='blue' 
       onClick={onSendclick} disabled={isloading} >
         <Icon icon='send'/>
       </InputGroup.Button>
     </InputGroup>
    </div>
  )
}

export default Bottom
