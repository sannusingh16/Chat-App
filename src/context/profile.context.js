/* eslint-disable arrow-body-style */
import React,{  createContext, useState ,useContext, useEffect} from "react";
import firebase  from "firebase/app";
import { auth, database } from "../misc/firebase";


export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const profilecontext=createContext();

export const ProfileProvider = ({children})=>{
  const [profile,setProfile]= useState(null)
  const [isloading,setisloading]=useState(true)
  

  useEffect(() => {
    let useRef;
    let userStatusRef;

    const authUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        userStatusRef = database.ref(`/status/${authObj.uid}`);
        useRef = database.ref(`/profiles/${authObj.uid}`);
        useRef.on('value', snap => {
          const { name, createdAt, avatar } = snap.val()

          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setisloading(false);
        });

        database
          .ref('.info/connected')
          .on('value', snapshot => {
            // If we're not currently connected, don't do anything.
            if (!!snapshot.val() === false) {
              return;
            }

            userStatusRef
              .onDisconnect()
              .set(isOfflineForDatabase)
              .then(() => {
                userStatusRef.set(isOnlineForDatabase);
              });
          });
      } else {
        if (useRef) {
          useRef.off();
        }

        database.ref('.info/connected').off()

        if (userStatusRef) {
          userStatusRef.off();
        }
        setProfile(null);
        setisloading(false);
      }
    });
    return () => {
      authUnsub();
      
      if (useRef) {
        useRef.off();
      }
      if (userStatusRef) {
        userStatusRef.off();
      }
      database.ref('.info/connected').off()
    };
  }, []);

  
  return <profilecontext.Provider value={{ profile, isloading}}>{children}</profilecontext.Provider>
}
  
export const useProfile=()=> useContext(profilecontext);