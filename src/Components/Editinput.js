/* eslint-disable arrow-body-style */
import React, { useCallback, useState } from 'react'
import { Alert, Icon, Input, InputGroup } from 'rsuite'

const Editinput = ({initialvalue,onsave,label=null,placeholder='Write the value',
                      emptymsg='Input is empty',wrapperclass="",...inputprops}) => {
      const [input,setinput]=useState(initialvalue) 
      const [iseditable,setiseditable]=useState(false)
      
      const oninputchange=useCallback((value)=>{
        setinput(value)
      },[])  

      const onEditClick=useCallback(()=>{
          setiseditable(A=>!A);
          setinput(initialvalue)
      },[initialvalue])

      const onsaveclick=async ()=>{
        const trimmed=input.trim()
        if(trimmed==='')
        {
          Alert.info(emptymsg)
        }
        if(trimmed!==initialvalue){
          await onsave(trimmed)
        }
        setiseditable(false)
      }

  return (
    <div className={wrapperclass}>
      {label}
      <InputGroup>
      <Input {...inputprops} placeholder={placeholder} onChange={oninputchange} 
      value={input} disabled={!iseditable}/>
      <InputGroup.Button onClick={onEditClick}><Icon icon={iseditable?'close':'edit'} />
      </InputGroup.Button>
      {iseditable && <InputGroup.Button onClick={onsaveclick}><Icon icon='check' /></InputGroup.Button>}
      </InputGroup>
    </div>
      
  )
}

export default Editinput
