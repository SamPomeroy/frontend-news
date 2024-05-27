import React, { Component } from 'react'
import NewsItem from './News/NewsItem'

export class Saved extends Component {
  render() {
    return (
      <div>
        {
        this?.props?.user?.saved.map(article=>(
            <NewsItem deleteFavorite={this.props.deleteFavorite} deleteSaved={this.props.deleteSaved} addSaved={this.props.addSaved} addFavorites={this.props.addFavorites} user={this.props.user} article={article} key={article.url}/>
        ))
        }
      </div>
    )
  }
}

export default Saved