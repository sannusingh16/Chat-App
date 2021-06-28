/* eslint-disable arrow-body-style */
import React,{ createContext, useContext, useEffect, useState } from "react";
import { database } from "../misc/firebase";
import { transforarray } from "../misc/helper,";



const RoomContext=createContext()

export const RoomsProvider=({children})=>{
  const [rooms,setrooms]=useState(null)
  useEffect(()=>{
      const roomlisref=database.ref('rooms')
      roomlisref.on('value', (snap)=>{
        const DATA=transforarray(snap.val())
        setrooms(DATA)
      })
      return () =>{
        roomlisref.off()
      }
  },[])

return <RoomContext.Provider value={rooms}>{children}</RoomContext.Provider>
}

export const useRooms=()=>useContext(RoomContext)