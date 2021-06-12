/* eslint-disable arrow-body-style */
import React, { useState } from 'react'
import { Alert, Button, Icon, Tag } from 'rsuite'
import firebase from 'firebase/app'
import { auth } from '../../misc/firebase'

const ProvideBlock = () => {
const [isConnected,setisConnected]=useState(
  {'google.com'
  :auth.currentUser.providerData.some((data)=>data.providerId=== "google.com"),
  'facebook.com'
  :auth.currentUser.providerData.some((data)=>data.providerId=== "facebook.com")
  })
  
  const updateisconnected=(providerId,value)=>{
   setisConnected((p)=>{
     return {...p,[providerId]:value}
   })
  }


  const unlink =async (providerId)=>{
    try {
      if(auth.currentUser.providerData.length === 1){
        throw new Error(`You Cannot Disconnet from ${providerId}`)
      }
       await auth.currentUser.unlink(providerId)
       updateisconnected(providerId,false)
    }
    catch(err){
      Alert.error(err.message)
    }
  }

     const unlinkgoogle=()=>{
        unlink('google.com')
     }  
     const unlinkfacebook=()=>{
       unlink('facebook.com')
    }  
    const link=async (provider)=>{
      try {
        await auth.currentUser.linkWithPopup(provider)
        Alert.success(`connected with ${provider.providerId}`)
        updateisconnected(provider.providerId,true)
      } catch (err) {
        Alert.Error(err.message)
      }
    } 



    const linkfacebook=()=>{
     link(new firebase.auth.FacebookAuthProvider())
    }
    const linkgoogle=()=>{
      link(new firebase.auth.GoogleAuthProvider())
    }


  return (
    <div>
      {isConnected['google.com'] &&
      <Tag color="green" closable onClose={unlinkgoogle}>
        <Icon icon='google' /> Connected
      </Tag>
       }
       {isConnected['facebook.com'] &&
      <Tag color="blue" closable onClose={unlinkfacebook}>
        <Icon icon='facebook' /> Connected
      </Tag>}
      <div className="mt-2">
        {!isConnected['google.com'] &&
        <Button block color='green' onClick={linkgoogle}>
          <Icon icon='google' /> Link to Google
        </Button>}
        {!isConnected['facebook.com'] &&
        <Button block color='blue' onClick={linkfacebook}>
          <Icon icon='facebook' />  Link to facebook
        </Button>}
      </div>
    </div>
  )
}

export default ProvideBlock
