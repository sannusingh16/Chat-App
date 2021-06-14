/* eslint-disable arrow-body-style */
export function nameshort(name){

  const shorname=name.toUpperCase().split(' ')
  if(shorname.length>1){
    return shorname[0][0]+shorname[1][0]
  }
   return shorname[0][0]
}

export function transforarray(snapvalue) {
   return snapvalue ? Object.keys(snapvalue).map(roomid=>{
     return {...snapvalue[roomid],id:roomid}
   }):[]
}

