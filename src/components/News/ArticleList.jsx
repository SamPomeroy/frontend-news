import {Link} from 'react-router-dom'

function ArticleList({articleList}) {
    return(
    articleList.map((article)=>{
        // return(
        //     <div key={movie.imdbID}>
        //         <Link  to={{pathname: `/movie-detail/${movie.Title}`}} >
        //         <div>
        //             <img className="moviePoster" src={movie.Poster} alt={movie.Title} />
        //         </div>
        //         <div>
        //             Title: {movie.Title}
        //             <br />
        //             Year: {movie.Year}
        //         </div>
        //         </Link>
        //     </div>
        // )
    })
)
}
export default ArticleList