import React from 'react'
import { Whisper,Tooltip,Badge} from 'rsuite'
import { usePresence } from '../misc/Customhook'

const getcolor=(Presence)=>{
  if(!Presence){
    return 'gray'
  }
  switch(Presence.state){
    case 'online':return 'green';
    case 'offline':return 'red';
    default: return 'gray';
  }
}
const getText=(Presence)=>{
if(!Presence){
  return 'unknown-state'
}
return Presence.state==='online'?'online':`Last online ${new Date(Presence.last_changed).toLocaleDateString()}`
}

const Presencedot = ({uid}) => {
  const Presence=usePresence(uid)
  return (
    <Whisper placement="top" trigger="hover" speaker={ <Tooltip>
      {getText(Presence)}
    </Tooltip>}>
      <Badge className="cursor-pointor" style={{backgroundColor:getcolor(Presence)}}/>
  </Whisper>
  )
}

export default Presencedot
