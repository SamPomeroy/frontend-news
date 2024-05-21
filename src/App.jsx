import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import React, { Component } from 'react'
import {ToastContainer} from 'react-toastify'
import MainRouter from './MainRouter'
import { jwtDecode } from 'jwt-decode'
import setAxiosAuthToken from './components/utils/setAxiosAuthToken'

export class App extends Component {
  state ={
    user: null
  }

  handleUserLogin=(user)=>{
    this.setState({user})
  }

  handleUserLogout=()=>{
    this.setState({user: null})
    window.localStorage.removeItem('jwt')
    setAxiosAuthToken(null)
  }

componentDidMount(){
  const jwt = window.localStorage.getItem('jwt')
  const currentUser = jwt ? jwtDecode(jwt) : null 
  if(currentUser && currentUser.exp > (Date.now()/1000)){
    this.setState({
      user: {
        username: currentUser.username,
        email: currentUser.email,
        id: currentUser.id
      }
    })
    setAxiosAuthToken(jwt)
  }
}

  render() {
    return (
      <>
      <ToastContainer position='top-center' />
      <MainRouter
      user = {this.state.user}
      handleUserLogin = {this.handleUserLogin}
      handleUserLogout = {this.handleUserLogout}
      />
      </>
    )
  }
}

export default App