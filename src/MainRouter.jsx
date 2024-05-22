import Home from './components/Home'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import{BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Profile from './components/Profile/Profile' 
import News from './components/News/News'
import NewsItem from './components/News/NewsItem'

function MainRouter(props) {
    return (
      <Router>
        <NavBar
          user ={props.user}
          handleUserLogout = {props.handleUserLogout}
          />
        <Routes>
          <Route path='/' element={<Home/>} />
          
          <Route exact path='/signup' element={<SignUp/>} />
          <Route exact path='/login' element={props.user ? <Navigate to='/News'/> : <Login handleUserLogin={props.handleUserLogin}/>} />
          <Route exact path='/profile' element={
          <PrivateRoute>
            <Profile user = {props.user}/>
            </PrivateRoute>}
            />
            <Route exact path='/News' element={<News/>}/>
            <Route path='/News-detail/:title' element={<PrivateRoute>
              <NewsItem/>
            </PrivateRoute>}/>
        </Routes>
       </Router>
    )
  }
  
  
  export default MainRouter