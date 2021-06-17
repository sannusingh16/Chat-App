/* eslint-disable arrow-body-style */
import React, { useRef, useState } from 'react'
import { Modal,Button, Alert } from 'rsuite'
import AvatarEditor from 'react-avatar-editor'
import Avatardisplay from './Avatardisplay'
import { useModalstate } from '../../misc/Customhook'
import { database, storage } from '../../misc/firebase'
import { useProfile } from '../../context/profile.context'
import { getuserupdate } from '../../misc/helper,'



const inputfiles='.png,.jpeg,.jpg'
const acceptedfiletype=['image/png','image/jpeg','image/jpg']


const Avatarbtn = () => {
  
  const {isOpen,open,close}=useModalstate()
  const isvalid=(file)=>acceptedfiletype.includes(file.type)
  const [image,setimage]=useState(null)
  const avataredited=useRef()
  const {profile}=useProfile()
  const [isloading,setisloading]=useState(false)

  const getblob=(canvas)=>{
    return new Promise((resolve,reject)=>{
       canvas.toBlob((blob)=>{
         if(blob){
           resolve(blob)
         }
         else{
           reject(new Error('file process error'))
         }
       })
    })
  }


  const onUpload=(ev)=>{
    const currentfile=ev.target.files
  
    if(currentfile.length===1){
      const file=currentfile[0]
      if(isvalid(file)){
        setimage(file)
        open()
        ev.target.value=null
        
      }
      else{
        Alert.error(`wrong file type ${file.type}`,4000)
      }

    }
  }

  const onuploadclicks=async()=>{
     const canvas=avataredited.current.getImageScaledToCanvas()  
     setisloading(true)
    try {
      const blob=await getblob(canvas)
      const avatarref=storage.ref(`/profiles/${profile.uid}`).child('avatar')
      const uploadavatarref=await avatarref.put(blob,{
        cacheControl:`public,max-age=${3600*24*3}`
      })
      const downloadurl=await uploadavatarref.ref.getDownloadURL()
      const updates=await getuserupdate(profile.uid,'avatar',downloadurl,database)
      database.ref().update(updates)
      Alert.info('updated avatar')
      setisloading(false)
      close()
    } catch (err) {
      Alert.error(err.message)
      setisloading(false)
    }
  }
  const ondeleteclicks=async()=>{
   try {
     if(profile.avatar){
     const avatardelref=storage.ref(`/profiles/${profile.uid}`).child('avatar')
     await avatardelref.delete()
     const avatardeldata=database.ref(`/profiles/${profile.uid}`).child('avatar')
     await avatardeldata.remove()
     Alert.info('avatar removed')
     }
     else{
       Alert.info('There is no avatar')
     }
   } catch (err) {
     Alert.error(err.messgae)
   }
 }
  return (

    
     <div className="mt-3 text-center">
       <Avatardisplay name={profile.name} src={profile.avatar} 
       className="width-200 height-200 img-fullsize font-huge"/>
      <div>
        <label htmlFor="avatar-upload" className="cursor-pointer d-block padded">
          Select New avatar
          <input id="avatar-upload"  type="file" className="d-none"
           accept={inputfiles}  onChange={onUpload} />
        </label>
        <Button appearance='ghost' onClick={ondeleteclicks}>Remove avatar</Button>
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
         ref={avataredited}
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
             <Button block appearance='ghost' onClick={onuploadclicks} disabled={isloading}>
                upload the file
             </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default Avatarbtn;