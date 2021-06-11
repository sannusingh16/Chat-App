/* eslint-disable arrow-body-style */
import React,{  createContext, useState ,useContext, useEffect} from "react";
import { auth, database } from "../misc/firebase";




const profilecontext=createContext();

export const ProfileProvider = ({children})=>{
  const [profile,setProfile]= useState(null)
  const [isloading,setisloading]=useState(true)
  

  useEffect(()=>{
    auth.onAuthStateChanged(authObj =>{
      if(authObj){
        database.ref(`/profiles/${authObj.uid}`).on('value', snap =>{
          const {name,createdAt}=snap.val()
        
          const data= {
            name,
            createdAt,
            uid:authObj.uid,
            email:authObj.email,
          }
         
          setProfile(data)
          setisloading(false)
        })

      }
      
      else{
        setProfile(null)
        setisloading(false)
      
      }
    })
  },[])

  
  return <profilecontext.Provider value={{ profile, isloading}}> {children}</profilecontext.Provider>
}
  
export const useProfile=()=> useContext(profilecontext);