/* eslint-disable arrow-body-style */
import React from 'react'
import { Avatar } from 'rsuite'
import { nameshort } from '../../misc/helper,'

const Avatardisplay = ({name,...rest}) => {
  return (
    <Avatar circle className="width-200 height-200 img-fullsize font-huge"{...rest}>
      {nameshort(name)}
    </Avatar>
  )
}

export default Avatardisplay
