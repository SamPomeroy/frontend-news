import React, { Component } from 'react'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'
import {toast} from 'react-toastify'
import { Button, Container, Form } from 'react-bootstrap'


export class Login extends Component {
    state={
        email:'',
        password:''
    }
    handleOnChange=(event)=>{
        this.setState({[event.target.name]: event.target.value})
    }
    handleOnSubmit=async (event)=>{
        event.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/users/sign-in', {
                email: this.state.email,
                password: this.state.password
            })
            const decodedObj = jwtDecode(response.data.payload)
            console.log(decodedObj)
            toast.success(`Hello, ${decodedObj.username}`)
            window.localStorage.setItem('jwt', response.data.payload)
            this.props.handleUserLogin(decodedObj)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
  render() {
    return (
        <Container className='bg-black text-white'  fluid style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '92vh'}}>
            <Form style={{width:'50vw'}} onSubmit={this.handleOnSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control name='email' value={this.state.email} onChange={this.handleOnChange}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' name='password' value={this.state.password} onChange={this.handleOnChange}></Form.Control>
                </Form.Group>
                <Button type='submit' className='mt-3'>Submit</Button>

            </Form>
        </Container>
    )
  }
}

export default Login