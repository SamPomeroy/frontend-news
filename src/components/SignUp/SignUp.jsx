import React, { Component } from 'react'
import './SignUp.css'
import {isAlpha, isAlphanumeric, isEmail, isStrongPassword} from 'validator'
import {toast} from 'react-toastify'
import axios from 'axios'

export class SignUp extends Component {
    state={
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '', 
        confirmPassword: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        usernameError: '',
        passwordError: '',
        confirmPasswordError: '',
        submitIsDisabled: true, 
    }
    componentDidUpdate =(prevProps, prevState)=>{
        const {firstName, 
            lastName, 
            email, 
            username, 
            password, 
            confirmPassword, 
            lastNameError, 
            firstNameError, 
            emailError, 
            passwordError, 
            usernameError, 
            confirmPasswordError}=this.state
        if(prevState.submitIsDisabled === true){
        if(firstName.length > 0 && 
            lastName.length > 0 &&
            email.length > 0 &&
            username.length > 0 && 
            password.length > 0 &&
            confirmPassword.length > 0 &&
            !lastNameError &&
            !firstNameError &&
            !usernameError &&
            !emailError &&
            !passwordError &&
            !confirmPasswordError){
                this.setState({submitIsDisabled: false})
            }
        }    else{
            if(!firstName || 
                !lastName ||
                !email ||
                !username ||
                !password ||
                !confirmPassword){
                    this.setState({submitIsDisabled: true})
        }
    }
    }

    handleOnSubmit = async (event) =>{
        event.preventDefault()
        console.log(this.state.firstName)
        try {
            const {
                firstName,
                lastName,
                username,
                email,
                password
            } = this.state
            const user = await axios.post('http://localhost:3000/users/sign-up', {firstName, lastName, email, username, password

            })
            if(user){
           toast.success('User created')
        } 
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        })
    }
    catch (error) {
        console.log(error.message)
        // toast.error(error.response.data.message)
    }
}
    handleOnChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        },()=>{
            switch (event.target.name){
                case "firstName": return this.handleFirstAndLastName(event)
                case "lastName": return this.handleFirstAndLastName(event)
                case "email": return this.handleEmail(event)
                case "username": return this.handleUsername(event)
                case "password": return this.handlePassword(event)
                case "confirmPassword": return this.handleConfirmPassword(event)
            }
        })
    }

    handleFirstAndLastName =(event)=>{
        if(this.state[event.target.name].length > 0){
            if(isAlpha(this.state[event.target.name])){
                this.setState({
                    [`${event.target.name}Error`]: ''
                })
            }else{
                this.setState({
                    [`${event.target.name}Error`]: `${event.target.placeholder} can only contain letters`
                })
            }
        }else{
            this.setState({[`${event.target.name}Error`]: `${event.target.placeholder} is required`})
        }
    }
    handleEmail =(event)=>{
        if(this.state[event.target.name].length > 0){
            if(isEmail(this.state[event.target.name])){
                this.setState({
                    [`${event.target.name}Error`]: ''
                })
            }else{
                this.setState({
                    [`${event.target.name}Error`]: `${event.target.placeholder} must be valid`
                })
            }
        }else{
            this.setState({[`${event.target.name}Error`]: `${event.target.placeholder} is required`})
        }
    }
    handleUsername =(event)=>{
        if(this.state[event.target.name].length > 0){
            if(isAlphanumeric(this.state[event.target.name])){
                this.setState({
                    [`${event.target.name}Error`]: ''
                })
            }else{
                this.setState({
                    [`${event.target.name}Error`]: `${event.target.placeholder} can only contain alphanumeric`
                })
            }
        }else{
            this.setState({[`${event.target.name}Error`]: `${event.target.placeholder} is required`})
        }
    }
    handlePassword =(event)=>{
        if(this.state[event.target.name].length > 0){
            if(isStrongPassword(this.state[event.target.name])){
                this.setState({
                    [`${event.target.name}Error`]: ''
                })
            }else{
                this.setState({
                    [`${event.target.name}Error`]: `${event.target.placeholder} must contain at least 8 characters, one uppsercase, one lowercase and one special character`
                })
            }
        }else{
            this.setState({[`${event.target.name}Error`]: `please confirm ${event.target.placeholder}`})
        }
    }
   
    handleConfirmPassword =(event)=>{
       if(this.state[event.target.name].length > 0){
            if(this.state.confirmPassword === this.state.password){
                this.setState({
                    [`${event.target.name}Error`]: ''
                })
            }else{
                this.setState({
                    [`${event.target.name}Error`]: `Password does not match. Please try again.`
                })
            }
        }else{
            this.setState({[`${event.target.name}Error`]: `${event.target.placeholder} is required`})
        
    }
    }
        
    

  render() {
    return (
      <div className='container'>
        <div className="form-text">Create an Account</div>
        <div className="form-div">
            <form onSubmit={this.handleOnSubmit} className="form">
                <div className="form-group-inline">
                <div className="inline-container">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" 
                    id='firstName' 
                    placeholder = 'First Name' 
                    name='firstName'
                    value={this.state.firstName} 
                    onChange={this.handleOnChange} 
                    />
                    <div className="errorMessage">{this.state.firstNameError}</div>
                </div>
                <div className="inline-container">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" 
                    id='lastName' 
                    placeholder = 'Last Name' 
                    name='lastName'
                    value={this.state.lastName} 
                    onChange={this.handleOnChange}
                     />
                      <div className="errorMessage">{this.state.lastNameError}</div>
                </div>
                </div>
                <div className="form-group-block">
                    <div className="block-container">
                        <label htmlFor="email">Email</label>
                        <input type="text"
                        id='email'
                        value={this.state.email}
                        name='email'
                        placeholder='Email' 
                        onChange={this.handleOnChange}
                        />
                        <div className="errorMessage">{this.state.emailError}</div>
                    </div>
                    <div className="block-container">
                        <label htmlFor="username">username</label>
                        <input type="text"
                        id='username'
                        value={this.state.username}
                        name='username'
                        placeholder='Username' 
                        onChange={this.handleOnChange}
                        />
                         <div className="errorMessage">{this.state.usernameError}</div>
                    </div>
                    <div className="block-container">
                        <label htmlFor="password">password</label>
                        <input type="text"
                        id='password'
                        value={this.state.password}
                        name='password'
                        placeholder='Password' 
                        onChange={this.handleOnChange}
                        />
                         <div className="errorMessage">{this.state.passwordError}</div>
                    </div>
                    <div className="block-container">
                        <label htmlFor="confirmPassword">confirm password</label>
                        <input type="text"
                        id='confirmPassword'
                        value={this.state.confirmPassword}
                        name='confirmPassword'
                        placeholder='Confirm Password' 
                        onChange={this.handleOnChange}
                        />
                         <div className="errorMessage">{this.state.confirmPasswordError}</div>
                    </div>
                </div>
                <div className="button-container">
                    <button disabled={this.state.submitIsDisabled} type='submit'>Submit</button>
                </div>
            </form>
        </div>
      </div>
    )
  }
} 

export default SignUp