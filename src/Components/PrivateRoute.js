import React from 'react'
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({children, ...restofprop}) => {
  const profile=false;

  if(!profile){
    return  <Redirect to='/signin' />
  }

  return (
    <Route {...restofprop}> { children } </Route>
  )
}

export default PrivateRoute
