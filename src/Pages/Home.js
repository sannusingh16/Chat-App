/* eslint-disable arrow-body-style */
import React from 'react'
import { Col, Grid, Row } from 'rsuite'
import Sidebar from '../Components/Sidebar'
import {RoomsProvider} from '../context/room.context'

const Home = () => {
  return (
    <RoomsProvider>
   <Grid fluid className="h-100">
     <Row className="h-100">
       <Col className="h-100" xs={24} md={8}>
        <Sidebar />
       </Col>
     </Row>
   </Grid>
   </RoomsProvider>
  )
}

export default Home
