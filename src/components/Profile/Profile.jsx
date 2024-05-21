import { Component } from 'react'
import Axios from '../utils/Axios'

export class Profile extends Component {
    state = {
        firstName: "",
        lastName: "",
        username: "",
        email: ""
    }
    
    async componentDidUpdate(prevProps){
        try {
            if(!prevProps.user && this.props.user){
                console.log(this.props.user)
                const foundUser = await Axios.get(`/get-user-by-id/${this.props.user.id}`)
                const {firstName, lastName, username, email}= foundUser.data.payload
                this.setState({firstName, lastName, username, email})

            }
        } catch (error) {
            console.log(error)
        }
    }
    // componentDidUpdate(prevProps){
    //     if(prevProps === null){

    //     }
    // }





  render() {
    return (
      <div>
        <div className="update-container">
            <h3>Profile</h3>
            <div>
                <p>First Name: {this.state.firstName}</p>
                <p>Last Name: {this.state.lastName}</p>
                <p>Username: {this.state.username}</p>
                <p>Email: {this.state.email}</p>
            </div>
        </div>
      </div>
    )
  }
}

export default Profile

