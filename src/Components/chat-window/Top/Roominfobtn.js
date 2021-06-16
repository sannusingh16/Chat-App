
import React,{memo} from 'react'
import {Button,Modal} from 'rsuite'
import { useCurrentroom } from '../../../context/currentroom.context'
import { useModalstate } from '../../../misc/Customhook'

const Roominfobtn = () => {
  const description=useCurrentroom(v=>v.description)
  const name=useCurrentroom(v=>v.name)
  const {isOpen,open,close}=useModalstate()
  return (
    <>
     <Button appearance='link' className="px-0" onClick={open}>
       Room information
     </Button>
     <Modal show={isOpen} onHide={close}>
       <Modal.Header>
         <Modal.Title>About {name} </Modal.Title>
       </Modal.Header>
       <Modal.Body>
        <h6 className="mb-1">Description</h6>
        <p>{description}</p>
       </Modal.Body>
       <Modal.Footer>
         <Button block onClick={close} color='blue'>
           Close
         </Button>
       </Modal.Footer>
     </Modal>
    </>
  )
}

export default memo(Roominfobtn)
