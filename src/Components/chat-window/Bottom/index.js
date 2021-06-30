/* eslint-disable arrow-body-style */
import React, { useCallback, useState } from 'react'
import {InputGroup,Input,Icon, Alert} from 'rsuite'
import firebase from 'firebase/app'
import { useParams } from 'react-router'
import { useProfile } from '../../../context/profile.context'
import { database } from '../../../misc/firebase'
import AttachmentBtnModal from './AttachmentBtnModal'
import AudioMsgBtn from './AudioMsgBtn'

function assemblemsg(profile,chatId) {
  return {
    roomId:chatId,
    author:{
      name:profile.name,
      uid:profile.uid,
      createdAt:profile.createdAt,
      ...(profile.avatar? {avatar:profile.avatar}:{})

    },
    createdAt:firebase.database.ServerValue.TIMESTAMP,
    Likecount:0
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
  const afterUpload= useCallback(
    async files => {
      setisloading(true);

      const updates = {};

      files.forEach(file => {
        const msgData = assemblemsg(profile, chatId);
        msgData.file = file;

        const messageId = database.ref('messages').push().key;

        updates[`/messages/${messageId}`] = msgData;
      });

      const lastMsgId = Object.keys(updates).pop();

      updates[`/rooms/${chatId}/lastMessage`] = {
        ...updates[lastMsgId],
        msgId: lastMsgId,
      };

      try {
        await database.ref().update(updates);
        setisloading(false);
      } catch (err) {
        setisloading(false);
        Alert.error(err.message);
      }
    },
    [chatId, profile]
  );

  return (
    <>
      <InputGroup>
      <AttachmentBtnModal afterUpload={afterUpload}/>
      <AudioMsgBtn afterUpload={afterUpload} />
       <Input placeholder="Write your messages..." value={input} onChange={oninput} onKeyDown={onKeyDown} />
       <InputGroup.Button appearance='primary' color='blue' 
       onClick={onSendclick} disabled={isloading} >
         <Icon icon='send'/>
       </InputGroup.Button>
     </InputGroup>
    </>
  )
}

export default Bottom
