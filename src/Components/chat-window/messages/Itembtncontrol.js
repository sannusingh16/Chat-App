/* eslint-disable arrow-body-style */
import React  from 'react'
import {Badge,Whisper,IconButton,Icon} from 'rsuite'

const Conditionalbadge=({condition,children})=> 
{return condition ? <Badge content={condition}>{children}</Badge>: children}

const Itembtncontrol = ({isvisible,iconname,tooltip,badgecontent,onClick,...props}) => {
 
 
  return(
    <div className="ml-2" style={{visibility:isvisible? 'visible':'hidden'}}>
      <Conditionalbadge condition={badgecontent}>
      <Whisper placement="top" delay={0} delayHide={0} delayShow={0} 
      trigger='hover' speaker={<tooltip>{tooltip}</tooltip>}>
        <IconButton {...props} onClick={onClick} circle size='xs' icon={<Icon icon={iconname}/>} />
      </Whisper>
      </Conditionalbadge>
    </div>
  )}

export default Itembtncontrol
