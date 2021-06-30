import React, { memo } from 'react'
import TimeAgo from 'timeago-react';
import {Button} from 'rsuite'
import Avatardisplay from '../../DashBoard/Avatardisplay'
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import Presencedot from '../../Presencedot';
import { useCurrentroom } from '../../../context/currentroom.context';
import { auth } from '../../../misc/firebase';
import { useHover, useMediaQuery } from '../../../misc/Customhook';
import Itembtncontrol from './Itembtncontrol';
import ImgBtnModal from './ImgBtnModal';

const renderFileMessage = file => {
  if (file.contentType.includes('image')) {
    return (
      <div className="height-220">
        <ImgBtnModal src={file.url} fileName={file.name} />
      </div>
    );
  }
  if (file.contentType.includes('audio')) {
    return (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <audio controls>
        <source src={file.url} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>    
      );
  }

  return <a href={file.url}>Download {file.name}</a>;
};

const Messagesitem = ({message,handleadmin,handleClick,handledelete}) => {
  const {author,createdAt,text,likes,Likecount,file}=message
  const [selfref,hovered]=useHover()
  const ismobile=useMediaQuery('(max-width:992px)')
  const isAdmins=useCurrentroom(v=>v.isAdmin)
  const admins=useCurrentroom(v=>v.admins)
  const canshow=hovered || ismobile
  const ismsgAuthoradmin=admins.includes(author.uid)
  const isAuthor=auth.currentUser.uid===author.uid
  const cangrantadmin=isAdmins && !isAuthor
  const isliked=likes && Object.keys(likes).includes(auth.currentUser.uid)


  return (
    <li className={`padded mb-1 cursor-pointer ${hovered?'bg-black-02':''}`} ref={selfref}>
     <div className="d-flex align-items-center font-bolder mb-1">
       <Presencedot uid={author.uid}/>
       <Avatardisplay src={author.avatar} name={author.name} className="ml-1" size="xs"/>
       <ProfileInfoBtnModal  profile={author} appearance="link" className="p-0 ml-1 text-black"  >
         {cangrantadmin && <Button block onClick={()=>handleadmin(author.uid)} color='blue'>
             {ismsgAuthoradmin?'Remove Admin':'Add admin'}
           </Button>}
       </ProfileInfoBtnModal>
       <TimeAgo  datetime={createdAt} className="font-normal ml-1 text-black-45" />
       <Itembtncontrol {...(isliked?{color:'red'}:{})} isvisible={canshow} iconname='heart'
       tooltip="Like the message" badgecontent={Likecount} onClick={()=>handleClick(message.id)}/>
       {isAuthor &&  <Itembtncontrol  isvisible={canshow} iconname='close'
       tooltip="Delete the message"  onClick={()=>handledelete(message.id,file)} />}
     </div>
     <div className="word-break-all">{text}</div>
     {file && renderFileMessage(file)}
   </li>
  )
}

export default memo(Messagesitem)
