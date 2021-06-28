/* eslint-disable arrow-body-style */
import React, { useCallback } from 'react'
import { Alert, Button, Drawer, Icon } from 'rsuite'
import Dashboard from '.'
import { isOfflineForDatabase } from '../../context/profile.context'
import {useModalstate,useMediaQuery} from '../../misc/Customhook'
import { auth, database } from '../../misc/firebase'

const DashboardToggle = () => {
  const {isOpen,close,open}=useModalstate()
  const formobile=useMediaQuery('(max-width:992px)')
  
  const SignOut=useCallback(()=>{
    database.ref(`/status/${auth.currentUser.uid}`)
              .set(isOfflineForDatabase)
              .then(() => {
                auth.signOut()
                Alert.info('SignedOut',4000)
                close();
              }).catch(err=>{
                 Alert.error(err.message)
              })



  },[close])

  return (
    <>
    <Button block color="red" onClick={open}>
      <Icon icon='dashboard' /> Dashboard
    </Button>
    <Drawer full={formobile} show={isOpen} onHide={close} placement="left">
      <Dashboard signOut={SignOut} /> 
    </Drawer>
    </>
  )
}

export default DashboardToggle
