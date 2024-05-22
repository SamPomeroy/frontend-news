import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './NavBar.css'

export class NavBar extends Component {
  render() {
    return (
     <nav className='Navbar navbar navbar-dark bg-dark'>
        <div className="h1-logo">
            <h1>
                <Link to= '/'>Home</Link>
            </h1>
      </div>
      <div className="right-side-nav">
        <ul>{
            this.props.user ?
            <li>
                <NavLink to='/profile'>
                  {this.props.username}
                </NavLink>
                
            </li> :
            <li>
              <NavLink to='/signup'>
                Create Account
              </NavLink>
            </li>
        }
        {
            this.props.user ?
            <li>
                <NavLink to='/Login' onClick={this.props.handleUserLogout}>
                Logout
                </NavLink>
            </li>
            :
            <li>
              <NavLink to='/login'>
                Login
              </NavLink>
            </li>
        }
        </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar