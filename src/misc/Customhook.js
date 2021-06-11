import { useCallback, useState } from "react";


export function useModalstate(defaultvalue=false){
  const [isOpen,setisOpen]=useState(defaultvalue)

  const open=useCallback(()=>setisOpen(true),[])
  const close=useCallback(()=>setisOpen(false),[])

  return {isOpen ,open ,close}
}