import React, { Component } from 'react'

export class Saved extends Component {
  render() {
    return (
      <div>
        {
        this?.props?.user?.saved.map(article=>(
            <NewsItem article={article} key={article.url}/>
        ))
        }
      </div>
    )
  }
}

export default Saved