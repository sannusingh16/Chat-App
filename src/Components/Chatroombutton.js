/* eslint-disable arrow-body-style */
import React, { useCallback, useRef, useState } from 'react'
import { Button,Icon,Modal,Form, FormGroup,ControlLabel, FormControl, Schema, Alert} from 'rsuite'
import firebase from 'firebase/app'
import { useModalstate } from '../misc/Customhook'
import { database } from '../misc/firebase'

const initialvalue={
  name:'',
  description:''

}

const { StringType } =Schema.Types
const model=Schema.Model({
  name:StringType().isRequired('Chat name is required'),
  description:StringType().isRequired('Description is required')
})

const Chatroombutton = () => {
   const {isOpen,open,close}=useModalstate()
   const [formvalue,setformvalue]=useState(initialvalue)
   const [isloading,setisloading]=useState(false)
   const formref=useRef()

  const onformchange=useCallback((value)=>{
        setformvalue(value)
  },[])

  const onSubmit=async() => {
     if(!formref.current.check())
     {
       return ;
     }
     setisloading(true)
     const newdata={
       ...formvalue,
       CreatedAt:firebase.database.ServerValue.TIMESTAMP
     }

    try {
      await database.ref('rooms').push(newdata)
      Alert.info(`${formvalue.name} Created`)
      setformvalue(initialvalue)
      close()
      setisloading(false)

    } catch (err) {
      Alert.error(err.message,4000)
    }
  }

  return (
   <div className='mt-1'>
   <Button block color='blue' onClick={open}>
     <Icon icon='telegram'  />  Create new chat room
   </Button>
   <Modal show={isOpen} onHide={close} >
      <Modal.Header>
        <Modal.Title>
             New Chat room
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
         <Form fluid onChange={onformchange} formValue={formvalue} model={model} 
         ref={formref}>
           <FormGroup>
             <ControlLabel>Room Name</ControlLabel>
             <FormControl name="name" placeholder='Enter chat room name...'/>
           </FormGroup>
           <FormGroup>
              <ControlLabel>Desciption</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
                placeholder="Enter room Description..... "
              />
            </FormGroup>
         </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button block appearance='primary' onClick={onSubmit} disabled={isloading}>
           Create new chat room
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
 
  )
}

export default Chatroombutton

