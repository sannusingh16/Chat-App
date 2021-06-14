/* eslint-disable arrow-body-style */
import React, { useEffect, useState,useRef } from 'react'
import {Divider} from 'rsuite'
import DashboardToggle from './DashBoard/DashboardToggle'
import Chatroombutton from './Chatroombutton'
import Roomlist  from './Rooms/Roomlist'

const Sidebar = () => {
  const heightref=useRef()
  const [height,setheight]=useState(0)
  useEffect(()=>{
    if(heightref.current){
      setheight(heightref.current.scrollHeight)
    }
  },[heightref])

  return (
    <div className="h-100 pt-2">
      <div ref={heightref}>
      <DashboardToggle />
      <Chatroombutton />
      <Divider>Join Conversation</Divider>
    </div>
      <Roomlist height={height}/>
    </div>
  )
}

export default Sidebar
