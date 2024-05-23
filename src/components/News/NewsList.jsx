import {Link} from 'react-router-dom'

function NewsList({newsList}) {
    return(
    articleList.map((item)=>{
        return(
            console.log(item)
        )
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
export default NewsList