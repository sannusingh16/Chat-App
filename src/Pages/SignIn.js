/* eslint-disable arrow-body-style */
import React from 'react';
import firebase from 'firebase/app'
import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from 'rsuite'
import {auth, database} from '../misc/firebase'


const SignIn = () => {

  const signinprovieder=async(provider)=>{
    try{
      const {additionalUserInfo,user}=await auth.signInWithPopup(provider)
      if(additionalUserInfo.isNewUser){
       await database.ref(`/profiles/${user.uid}`).set({
          name:user.displayName,
          createdat:firebase.database.ServerValue.TIMESTAMP
        })
      }
      Alert.info('signed in',4000)
    }
    catch(err){
      Alert.info(err.message,4000)
    }
  }


  const GoogleSignin=()=>{
    signinprovieder(new firebase.auth.GoogleAuthProvider())
  }

  const FacebookSignin=()=>{
    signinprovieder(new firebase.auth.FacebookAuthProvider())
  }
  return (
    <Container>
    <Grid className="mt-page"> 
     <Row>
       <Col xs={24}   md={12} mdOffset={6} >
         <Panel>
           <div className="text-center">
             <h2>Welcome To Chat</h2>
             <p>Progressive chat platform for neophytes</p>
           </div>
           <div className="mt-3">
            <Button block color="blue" onClick={FacebookSignin}><Icon icon="facebook"  /> Continue With Facebook </Button>
            <Button block color="green" onClick={GoogleSignin}><Icon icon="google"  />  Continue With Google </Button>
           </div>
         </Panel>
       </Col>
     </Row>
     </Grid> 
    </Container>
  )
}

export default SignIn
