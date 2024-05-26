import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class NewsList extends Component {
  render() {
    return (
      <div>NewsList
        {
            this.props.newsList.map(article=>{
                return(
                    <NewsItem user={this.props.user} key={article.title} article={article}/>
                )
            })
        }
      </div>
    )
  }
}

export default NewsList
