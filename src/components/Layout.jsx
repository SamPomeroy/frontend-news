import React from 'react'
import Navbar from './NavBar'

export default function Layout(props) {
  console.log(props)
  return (
    <div>
        <Navbar user = {props.user} logoutUser={props.logoutUser}/>
        {props.children}
    </div>
  )
}
