import React from 'react'
import { useParams } from 'react-router'
import {Alert, Button,Drawer} from 'rsuite'
import { useCurrentroom } from '../../../context/currentroom.context'
import { useMediaQuery, useModalstate } from '../../../misc/Customhook'
import { database } from '../../../misc/firebase'
import Editinput from '../../Editinput'

const Editinroombtn = () => {
  const {open,close,isOpen}=useModalstate()
  const {chatId}=useParams()
  const name=useCurrentroom(v=>v.name)
  const description=useCurrentroom(v=>v.description)
  const ismobile=useMediaQuery('(max-width:992px)')

  const update=(key,value)=>{
      database.ref(`/rooms/${chatId}`).child(key).set(value).then(()=>{
        Alert.success('updated succesfully',4000)
      }).catch(err=>{
        Alert.error(err.message,4000)
      })
  }

  const onnamesave=(newname)=>{
    update('name',newname)
  }
  const ondescsave=(newdesc)=>{
    update('description',newdesc)
  }
  return (
    <div>
      <Button className="br-circle" size='sm' color='red' onClick={open}>
       A
      </Button>
      <Drawer full={ismobile} show={isOpen} onHide={close} placement='right'>
       <Drawer.Header>
         <Drawer.Title>Edit Room</Drawer.Title>
       </Drawer.Header>
       <Drawer.Body>
         <Editinput initialvalue={name} onsave={onnamesave} 
         label={<h6 className="mb-2">Name</h6>} emptymsg="name is empty"/>
         <Editinput componentClass="textarea" rows={5} initialvalue={description} onsave={ondescsave} 
          emptymsg="Description is empty" wrapperclass="mt-3"/>
       </Drawer.Body>
       <Drawer.Footer>
         <Button block onClick={close} color='blue' placement='right'>close</Button>
       </Drawer.Footer>
      </Drawer>

    </div>
  )
}

export default Editinroombtn
