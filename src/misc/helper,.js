/* eslint-disable arrow-body-style */
export function nameshort(name){

  const shorname=name.toUpperCase().split(' ')
  if(shorname.length>1){
    return shorname[0][0]+shorname[1][0]
  }
   return shorname[0][0]
}

export function transferar(snapval){
  return snapval ? Object.keys(snapval):[];
}

export function transforarray(snapvalue) {
   return snapvalue ? Object.keys(snapvalue).map(roomid=>{
     return {...snapvalue[roomid],id:roomid}
   }):[]
}

export async function getuserupdate(userId,keyToupdate,value,db){
     
  const updates={}
  updates[`/profiles/${userId}/${keyToupdate}`]=value;

  const getMsg=db.ref('/messages').orderByChild('/author/uid')
  .equalTo(userId).once('value')
  const getrms=db.ref('/rooms').orderByChild('/lastmessage/author/uid')
  .equalTo(userId).once('value')
  const [msgsnap,rmssnap]=await Promise.all([getMsg,getrms])
  msgsnap.forEach(msnap=>{
    updates[`/messages/${msnap.key}/author/${keyToupdate}`]=value
  })
  rmssnap.forEach(rsnap=>{
    updates[`/rooms/${rsnap.key}/lastmessage/author/${keyToupdate}`]=value
  })
  return updates;
}
 