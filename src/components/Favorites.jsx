import React, { Component } from 'react'
import NewsItem from './News/NewsItem'

export class Favorites extends Component {
  render() {
    return (
      <div>{
            this?.props?.user?.favorites.map(article=>(
                <NewsItem article={article} key={article.url}/>
            ))

        }</div>
    )
  }
}

export default Favorites