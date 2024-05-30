import { Component } from 'react'

export class Profile extends Component {
    state = {
        firstName: "",
        lastName: "",
        username: "",
        email: ""
    }
    

// componentDidUpdate(prevProps, prevState){
//   console.log(this.state)
//   if(prevProps.user !== this.props.user){
//     console.log(this.props)
    
//     this.setState({firstName: this.props.user.firstName, lastName: this.props.user.lastName, email: this.props.user.email, username: this.props.user.username})
//   }
// }



  render() {
    return (
      <div >
        <div style={{width: '100vw', height:'92vh', overflow: 'auto', display: 'flex', justifyContent: 'center', padding: '20px'}} className='bg-dark text-white' >
          <div>
            <h3><u>Profile</u></h3>
            <div>
                <p className='text-white'>First Name: {this.props.user.firstName}</p>
                <p>Last Name: {this.props.user.lastName}</p>
                <p>Username: {this.props.user.username}</p>
                <p>Email: {this.props.user.email}</p>
            </div>
        </div>
        </div>
      </div>
    )
  }
}

export default Profile

