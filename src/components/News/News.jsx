import React, { Component } from 'react'
import axios from 'axios'
import './News.css'
import NewsList from './NewsList'
import {Audio} from 'react-loader-spinner'

export class News extends Component {
    state= {
       
        newsList: [],
        searchInput: '',
        isLoaded: false
    }

    handleOnChange=(e)=>{
      this.setState({searchInput: e.target.value})
    }
    //check axios news api call
    // `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page}&apiKey=
    handleOnSubmit =async()=>{
      try {
        let foundArticles = await axios.get(`https://newsapi.com/?apikey=${import.meta.env.VITE_NEWS_KEY}&s=${this.state.searchInput}`)
        this.setState({newsList: foundArticles.data.Search })
      } catch (error) {
        console.log(error)
      }
    }

    async componentDidMount(){
        try {
            //top 10 stories?
           const starterNewsList= [
                // "Forrest Gump",
                // "Avengers",
                // "Hacksaw Ridge",
                // "Real Steel",
                // "The Help",
                // "Scream",
                // "Misery",
                // "Rio",
                // "Dodgeball"
    
            ]
            const newsArray = []
            //check axios news api call
            for(let article of starternewsList){
                const newsInfo = await axios.get(`https://newsapi.org/v2/top-headlines/sources?apiKey=VITE_NEWS_KEY`)
                console.log(newsInfo)
                newsArray.push(newsInfo.data)
            }
            this.setState({newsList: [...newsArray], isLoaded: true})
        } catch (error) {
            console.log(error)
        }
    }

    render() {
      return (
        <div>
          {
          !this.state.isLoaded ? 
          (<Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />) : 
          (
            <>
          <div id="mainApp">
              <input 
              onChange={this.handleOnChange}
              type="text"
              placeholder='Search for an article...'
              name='article'
              value = {this.state.searchInput}/>
              <button onClick={this.handleOnSubmit}> Search</button>
          </div>
          <div id="newsListContainer">
              <h3>News App</h3>
              <div>
                  <NewsList newsList ={this.state.newsList}/>
              </div>
          </div>
          </>
      )
    }
    </div>
    )
   }
}
export default News 