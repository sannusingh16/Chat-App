import React from 'react'
import { Redirect, Route } from 'react-router';

const PublicRoute = ({children , ...restofprop}) => {
  const profile=false;

  if(profile){
    return  <Redirect to='/' />
  }

  return (
    <Route {...restofprop}> { children } </Route>
  )
}

export default PublicRoute
