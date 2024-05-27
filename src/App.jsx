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
  try {
    const newFav=await Axios.post(`/add-favorite/${this.state.user.id}`, article)
    console.log(newFav)
    const user={...this.state.user, favorites: [...this.state.user.favorites, article]}
    this.setState({user})
  } catch (error) {
    console.log(error)
  }
}
addSaved =async(article)=>{
  try {
    const newSaved=await Axios.post(`/add-saved/${this.state.user.id}`, article)
    console.log(newSaved)
    const user={...this.state.user, saved: [...this.state.user.saved, article]}
    this.setState({user})
  } catch (error) {
    console.log(error)
  }
}
deleteFavorite = async(url)=>{
  try {
    const article=this.state.user.favorites.find(e=>e.url===url)
    const deleted = await Axios.put(`/delete-favorite/${this.state.user.id}/${article._id}`)
    console.log(deleted)
    const favorites=[...this.state.user.favorites]
    const updateFavorites=favorites.map(i=> {
      if(i.url !== url){
        return i
      }
    })
    const user={...this.state.user, favorites: [...updateFavorites]}
    this.setState({user})
  } catch (error) {
    console.log(error)
  }
}
deleteSaved = async(url)=>{
  try {
    const article=this.state.user.saved.find(e=>e.url===url)
    const deleted = await Axios.put(`/delete-saved/${this.state.user.id}/${article._id}`)
    console.log(deleted)
    const saved=[...this.state.user.saved]
    const updateSaved=saved.map(i=> 
      {
        if(i.url !== url){
          return i
        }
      }
    )
    const user={...this.state.user, saved: updateSaved}
    this.setState({user})
  } catch (error) {
    console.log(error)
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
      addFavorites={this.addFavorites}
      addSaved={this.addSaved}
      deleteFavorite={this.deleteFavorite}
      deleteSaved={this.deleteSaved}
      />
      </>
    )
  }
}

export default App