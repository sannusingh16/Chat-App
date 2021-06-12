/* eslint-disable arrow-body-style */
import React, { useState } from 'react'
import { Modal,Button, Alert } from 'rsuite'
import AvatarEditor from 'react-avatar-editor'
import { useModalstate } from '../../misc/Customhook'

const inputfiles='.png,.jpeg,.jpg'
const acceptedfiletype=['image/png','image/jpeg','image/jpg']


const Avatarbtn = () => {
  
  const {isOpen,open,close}=useModalstate()
  const isvalid=(file)=>acceptedfiletype.includes(file.type)
  const [image,setimage]=useState(null)

  const onUpload=(ev)=>{
    const currentfile=ev.target.files
    if(currentfile.length===1){
      const file=currentfile[0]
      if(isvalid(file)){
        setimage(file)
        open()
      }
      else{
        Alert.error(`wrong file type ${file.type}`,4000)
      }

    }
  }

  return (
    <div className="mt-3 text-center">
      <div>
        <label htmlFor="avatar-upload" className="cursor-pointer d-block padded">
          Select New avatar
          <input id="avatar-upload"  type="file" className="d-none"
           accept={inputfiles} onChange={onUpload}/>
        </label>
        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>
              Adjust and upload new avatar
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
         {image && (
         <AvatarEditor
         image={image}
         width={200}
         height={200}
         border={10}
         borderRadius={100}
         rotate={0}
          />)}
          </div>
          </Modal.Body>
          <Modal.Footer>
             <Button block appearance='ghost'>
                upload the file
             </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default Avatarbtn;