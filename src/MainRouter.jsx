import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import PrivateRoute from './components/PrivateRoute'
import{BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import Profile from './components/Profile' 
import News from './components/News/News'
import Layout from './components/Layout'
import Favorites from './components/Favorites'
import Saved from './components/Saved'

function MainRouter(props) {
    console.log(props)
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Layout user = {props.user}><Home/></Layout>} />
          
          <Route exact path='/signup' element={<Layout user = {props.user}><SignUp/></Layout>} />
          <Route exact path='/login' element={props.user ? <Navigate to='/News'/> : <Layout user = {props.user}><Login handleUserLogin={props.handleUserLogin}/></Layout>} />
          <Route exact path='/profile' element={
          <PrivateRoute>
            <Layout user = {props.user}>
            <Profile user = {props.user}/>
            </Layout>
            </PrivateRoute>}
            />
            <Route exact path='/news' element={<PrivateRoute>
            <Layout user = {props.user} logoutUser={props.handleUserLogout}>
            <News user = {props.user} addFavorites={props.addFavorites}/>
            </Layout>
            </PrivateRoute>}/>
            <Route exact path='/favorites' element={<PrivateRoute>
            <Layout user = {props.user} logoutUser={props.handleUserLogout}>
            <Favorites user = {props.user}/>
            </Layout>
            </PrivateRoute>}/>
            <Route exact path='/saved' element={<PrivateRoute>
            <Layout user = {props.user} logoutUser={props.handleUserLogout}>
            <Saved user = {props.user}/>
            </Layout>
            </PrivateRoute>}/>


        </Routes>
       </Router>
    )
  }
  
  
  export default MainRouter