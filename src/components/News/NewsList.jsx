import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import NewsItem from './NewsItem'


export class NewsList extends Component {
  
  componentDidMount(){console.log(this.props)}
  render() {
    return (
      <div>
        {
            this.props.newsList.map(article=>{
                return(
                    <NewsItem deleteFavorite={this.props.deleteFavorite} deleteSaved={this.props.deleteSaved} addSaved={this.props.addSaved} addFavorites={this.props.addFavorites} user={this.props.user} key={article.title} article={article}/>
                )
            })
        }
      </div>
    )
  }
}

export default NewsList
