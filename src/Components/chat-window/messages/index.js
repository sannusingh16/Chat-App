/* eslint-disable arrow-body-style */
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Alert } from 'rsuite'
import {auth, database, storage} from '../../../misc/firebase'
import { transforarray } from '../../../misc/helper,'
import Messageitem from './Messagesitem'

const Messages = () => {
  const [messages,setmessgaes]=useState(null)
  const {chatId}=useParams()
  const ischatempty=messages && messages.length===0;
  const canshowmsg=messages && messages.length>0;
  useEffect(()=>{
    const msgref=database.ref('/messages')
    msgref.orderByChild('roomId').equalTo(chatId).on('value',(snap)=>{
      const data=transforarray(snap.val())
      setmessgaes(data)
    })
    return ()=>{
      msgref.off()
    }
  },[chatId])
  const handleadmin=useCallback(async(uid)=>{
    const adminref=database.ref(`/rooms/${chatId}/admins`)
    let alert;
    await adminref.transaction(admins=>{
      if(admins){
        if(admins[uid]){
            admins[uid]=null
            alert='Admin permission removed'
        }
        else{
          admins[uid]=true
          alert='Admin permission grandted'
        }
      }
      return admins;
    })
    Alert.info(alert,4000)
  },[chatId])
  const handleClick=useCallback(async(msgid)=>{
    let alertms;
      const {uid}=auth.currentUser;
      const mgsref=database.ref(`/messages/${msgid}`)
      await mgsref.transaction(msg=>{
        if(msg){
          if(msg.likes && msg.likes[uid]){
            msg.Likecount-=1
            msg.likes[uid]=null
            alertms='like removed'
          }
          else{
            msg.Likecount+=1
            if(!msg.likes){
              msg.likes={}
            }
            msg.likes[uid]=true;
            alertms='liked'
          }
        }
        return msg;
      })
      Alert.info(alertms,4000)
  },[])
   const handledelete=useCallback(async(msgid,file)=>{
    // eslint-disable-next-line no-alert
    if(!window.confirm('Confirm to delete message')){
      return ;
    }
    const islast=messages[messages.length-1].id===msgid
    const updates={}
    updates[`/messages/${msgid}`]=null
    if(islast && messages.length>1){
      updates[`/rooms/${chatId}/lastmessage`]={
        ...messages[messages.length-2],
        msgId:messages[messages.length-2].id
      }
     
    }
    if(islast && messages.length===1){
      updates[`/rooms/${chatId}/lastmessage`]=null
    }
    try {
      database.ref().update(updates)
      Alert.info('Message deleted')
    } catch (err) {
      Alert.error(err.msg,4000)
    }
    if (file) {
      try {
        const fileRef = storage.refFromURL(file.url);
        await fileRef.delete();
      } catch (err) {
        Alert.error(err.message);
      }
    }
   },[chatId, messages])


  return (
    <ul className="msg-list custom-scroll">
      {ischatempty && <li>Chat is empty</li>}
      {canshowmsg && messages.map(msg=> <Messageitem key={msg.id} message={msg} handleadmin={handleadmin} handleClick={handleClick} handledelete={handledelete}/>)}
     
    </ul>
  )
}

export default Messages

