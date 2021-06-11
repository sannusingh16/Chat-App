/* eslint-disable arrow-body-style */
import React, { useCallback } from 'react'
import { Alert, Button, Drawer, Icon } from 'rsuite'
import Dashboard from '.'
import {useModalstate,useMediaQuery} from '../../misc/Customhook'
import { auth } from '../../misc/firebase'

const DashboardToggle = () => {
  const {isOpen,close,open}=useModalstate()
  const formobile=useMediaQuery('(max-width:992px)')
  
  const SignOut=useCallback(()=>{
    auth.signOut()
    Alert.info('SignedOut',4000)

    close();

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
