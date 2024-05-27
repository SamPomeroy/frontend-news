import React, { Component } from 'react'
import axios from 'axios'
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

    handleOnSubmit =async()=>{
      try {
        let foundArticles = await axios.get(`https://newsapi.org/v2/everything?q=${this.state.searchInput}&apiKey=${import.meta.env.VITE_NEWS_KEY}&language=en`)
        this.setState({newsList: foundArticles.data.articles, searchInput: "" })

        console.log(foundArticles)
      } catch (error) {
        console.log(error)
      }
    }

    async componentDidMount(){
      this.setState({isLoaded: true})
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
            for(let article of starterNewsList){
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
                  <NewsList addFavorites={this.props.addFavorites} user={this.props.user} newsList ={this.state.newsList}/>
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