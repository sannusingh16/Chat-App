/* eslint-disable arrow-body-style */
import React from 'react'
import { Alert, Button, Divider, Drawer } from 'rsuite'
import {useProfile} from '../../context/profile.context'
import { database } from '../../misc/firebase'
import Editinput from '../Editinput'
import ProvideBlock from './ProvideBlock'
import Avatarbtn from './Avatarbtn'

const Dashboard = ({signOut}) => {
  const {profile}=useProfile()

  const onsave= async newdata=>{
      const updateusername=database.ref(`/profiles/${profile.uid}`).child('name')
      try{
        await updateusername.set(newdata)
        Alert.success('Nickname updated',4000)
      }
      catch(err){
          Alert.error(err.msg,4000)
      }
  }
  return (
    <>
    <Drawer.Header>
         <Drawer.Title>
         Dashboard
         </Drawer.Title>
    </Drawer.Header>
      
      <Drawer.Body>
        <h3> Hey,{profile.name} </h3>
        <ProvideBlock />
        <Divider />
      <Editinput name="nickname" 
                  initialvalue={profile.name}
                  onsave={onsave}
                  label={<div className="mb-2">Nickname</div>}/>
      <Avatarbtn />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={signOut}>Sign Out</Button>
      </Drawer.Footer>
     </> 
    
  )
}

export default Dashboard
