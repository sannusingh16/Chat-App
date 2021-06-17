/* eslint-disable arrow-body-style */
import React from 'react'
import { Avatar } from 'rsuite'
import { nameshort } from '../../misc/helper,'

const Avatardisplay = ({name,...rest}) => {
  return (
    <Avatar circle  {...rest}>
      {nameshort(name)}
    </Avatar>
  )
}

export default Avatardisplay
