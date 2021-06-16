
import React from 'react'
import { Col, Grid, Row } from 'rsuite'
import {Switch,Route, useRouteMatch} from 'react-router-dom'
import Sidebar from '../../Components/Sidebar'
import {RoomsProvider} from '../../context/room.context'
import Chat from './Chat'
import { useMediaQuery } from '../../misc/Customhook'

const Home = () => {
const isdesktop=useMediaQuery('(min-width: 992px)')
const { isExact }=useRouteMatch()
 
const cansidebar=isdesktop || isExact

  return (
    <RoomsProvider>
   <Grid fluid className="h-100">
     <Row className="h-100">
       {cansidebar && <Col className="h-100" xs={24} md={8}>
        <Sidebar />
       </Col>}
       <Switch>
         <Route exact path="/chat/:chatId">
           <Col xs={24} md={16} className="h-100">
             <Chat />
           </Col>
         </Route>
         <Route>
           {isdesktop && <Col xs={24} md={16} className="h-100">
             <h6 className="text-center mt-page"> Please Select chat </h6>
             </Col>}
         </Route>
       </Switch>
     </Row>
   </Grid>
   </RoomsProvider>
  )
}

export default Home
