/* eslint-disable arrow-body-style */
import React from 'react'
import { Button, Drawer, Icon } from 'rsuite'
import Dashboard from '.'
import {useModalstate} from '../../misc/Customhook'

const DashboardToggle = () => {
  const {isOpen,close,open}=useModalstate()
  return (
    <>
    <Button block color="blue" onClick={open}>
      <Icon icon='dashboard' /> Dash
    </Button>
    <Drawer show={isOpen} onHide={close} placement="left">
      <Dashboard /> 
    </Drawer>
    </>
  )
}

export default DashboardToggle
