
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {Nav,Loader} from 'rsuite'
import { useRooms } from '../../context/room.context'
import Roomitem from './Roomitem'



const Roomlist = ({height}) => {
  const rooms=useRooms()
  const location=useLocation()


  return (
    <Nav appearance='subtle' vertical reversed 
    className="overflow-y-scroll custom-scroll" style={{
      height: `calc(100% - ${height}px)`
    }} activeKey={location.pathname}>
      {!rooms && (<Loader center vertical content='loading' speed='slow' size='md'  />)}
       
     {rooms && rooms.length>0 && rooms.map(room=>(
        <Nav.Item componentClass={Link} to={`/chat/${room.id}`} key={room.id} 
        eventKey={`/chat/${room.id}`}>
          <Roomitem room={room}/>
        </Nav.Item>))}
    </Nav>
  )
}

export default Roomlist
