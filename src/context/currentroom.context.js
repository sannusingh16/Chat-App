/* eslint-disable arrow-body-style */
import React from "react";
import { createContext,  useContextSelector } from "use-context-selector";



const CurrentRoomContext=createContext();

export const CurrentRoomProvider=({children,DATa})=>{

  return (<CurrentRoomContext.Provider value={DATa}>{children}</CurrentRoomContext.Provider>)

}

export const useCurrentroom=(selector)=>useContextSelector(CurrentRoomContext,selector)