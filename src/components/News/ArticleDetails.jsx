import React, { Component } from 'react'
import axios from 'axios'
import {isEmail} from 'validator'
import Axios from '../utils/Axios'


export class ArticleDetails extends Component {
    
    state={
        // Actors: '',
        // Awards: '',
        // Country: '',
        // Plot: '',
        // Rated: '',
        // Title: '',
        // imdbID: '',
        // toggleEmailer: false,
        // email: '',
        // message: ''
    }

  async componentDidMount(){

    try {
        //check axios news api call
        const path = window.location.pathname.split('/')
        const title = path[path.length - 1]
        const result = await axios.get(`https://newsapi.com/?apikey=${import.meta.env.VITE_NEWS_KEY}&t=${title}`)
        this.setState({
        // Actors: result.data.Actors,
        // Awards: result.data.Awards,
        // Country: result.data.Country,
        // Plot: result.data.Plot,
        // Rated: result.data.Rated,
        // Title: result.data.Title,
        // imdbID: result.data.imdbID,
        // Poster: result.data.Poster
        })
    } catch (error) {
        
    }
  }

  handleOnChange =(event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
//work on clear input fields on submit
  handleOnSubmit = async (e) =>{
    e.preventDefault()
    try {
      const inputValue = this.inputRef.value;
      if(this.state.email && this.state.message && isEmail(this.state.email)){
        const response = await Axios.post('http://localhost:3000/mailjet/send-message', {
            recipient: this.state.email,
            message: this.state.message
        })
        this.inputRef.value = '',
        console.log(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  showEmailer = ()=>{
    if(!this.state.toggleEmailer){
      return(
        <div>
          <p style = {{cursor: 'pointer', color: 'blue' }}
          onClick={()=>this.setState({toggleEmailer: true})}>
            Share!
          </p>
        </div>
      )
    }else{
      return(
        <div>
          <div id="emailer">
            <form onSubmit={this.handleOnSubmit}>
              <label htmlFor="email">Friend's email</label>
              <input 
              type='text'
              id='recipient'
              name='email'
              onChange={this.handleOnChange}
              ref={(input)=>(this.inputRef=input)}
              />
              <br />
              <label htmlFor='message'>Message</label>
              <input 
              id="message"
              name='message'
              onChange={this.handleOnChange}
              type="text" 
              ref={(input)=>(this.inputRef=input)}
              />
              <button 
              type="submit"
               >Submit</button>
            </form>
          </div>
        </div>
      )
    }
  }

  showArticleDetails =()=>{
    // return (
    //       <div style={{display: 'flex'}}>
    //           <div>
    //               <img src={this.state.Poster} alt={this.state.Title} />
    //           </div>
    //           <div>
    //           <div>Actors: {this.state.Actors}</div>
    //           <div>Awards: {this.state.Awards}</div>
    //           <div>Country: {this.state.Country}</div>
    //           <div>Plot: {this.state.Plot}</div>
    //           <div>Rated: {this.state.Rated}</div>
    //           <div>Title: {this.state.Title}</div>
    //           <div>imdbID: {this.state.imdbID}</div>
    //           {this.showEmailer()}
    //           </div>
              
    //       </div>
    //   )
  }

  render() {
    return(
      <div> 
        {this.showArticleDetails()}
      </div>
    )
  }
}

export default ArticleDetails