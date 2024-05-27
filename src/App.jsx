import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import React, { Component } from 'react'
import {ToastContainer} from 'react-toastify'
import MainRouter from './MainRouter'
import { jwtDecode } from 'jwt-decode'
import setAxiosAuthToken from './components/utils/setAxiosAuthToken'
import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from './components/utils/Axios'

export class App extends Component {
  state ={
    user: null
  }

  handleUserLogin=async (userObj)=>{
    try {
      const allUserInfo=await Axios.get(`/get-user-info/${userObj.id}`)
      console.log(allUserInfo)
      const user={...userObj, favorites: allUserInfo.data.favorites, saved: allUserInfo.data.saved}
      this.setState({user})
    } catch (error) {
      console.log(error)
    }
    
  }

  handleUserLogout=()=>{
    this.setState({user: null})
    window.localStorage.removeItem('jwt')
    setAxiosAuthToken(null)
  }

async componentDidMount(){
  const jwt = window.localStorage.getItem('jwt')
  const currentUser = jwt ? jwtDecode(jwt) : null 
  if(currentUser && currentUser.exp > (Date.now()/1000)){
    try {
      const allUserInfo=await Axios.get(`/get-user-info/${currentUser.id}`)
      console.log(allUserInfo)
      this.setState({
        user: {
          username: currentUser.username,
          email: currentUser.email,
          id: currentUser.id,
          saved: allUserInfo.data.saved,
          favorites: allUserInfo.data.favorites
        }
      })
    } catch (error) {
      console.log(error)
    }
    setAxiosAuthToken(jwt)
  }
}
//saved and favorites funtions
addFavorites =async(article)=>{
  const user={...this.state.user, favorites: [...this.state.user.favorites, article]}
  this.setState({user})
}

  render() {
    return (
      <>
      <ToastContainer position='top-center' />
      <MainRouter
      user = {this.state.user}
      handleUserLogin = {this.handleUserLogin}
      handleUserLogout = {this.handleUserLogout}
      addFavorites={this.addFavorites}
      />
      </>
    )
  }
}

export default App