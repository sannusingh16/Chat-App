import React,{memo} from 'react'
import { Link } from 'react-router-dom'
import {Icon,ButtonToolbar} from 'rsuite'
import { useCurrentroom } from '../../../context/currentroom.context'
import { useMediaQuery } from '../../../misc/Customhook'
import Roominfobtn from './Roominfobtn'

const Top = () => {
  const name=useCurrentroom(v=>v.name)
  const ismobile=useMediaQuery('(max-width:992px)')

  return (
   <div>
    <div className="d-flex justify-content-between align-items-center">
      <h4 className='text-disappear d-flex align-item-center'>
          <Icon componentClass={Link} to="/" icon='arrow-circle-left' size='2x'
          className={ismobile?'d-inline-block p-0 mr-2 text-blue link-unstyled':'d-none'}/>
          <span className="text-disappear">{name}</span>
      </h4>
      <ButtonToolbar className="ws-nowrap">
        todo
      </ButtonToolbar>
    </div>
    <div className="d-flex justify-content-between align-items-center">
      <span>todo</span>
      <Roominfobtn />
    </div>
   </div>
  )
}

export default memo(Top)
