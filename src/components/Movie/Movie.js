import React from 'react'
import './Movie.scss'

const defaultPlaceholderImage = "https://ak4.picdn.net/shutterstock/videos/6309044/thumb/1.jpg"

const Movie = ({ movie }) => {

    const poster = () => {
        if (movie.Poster === 'N/A') {
            return defaultPlaceholderImage
        } else {
            return movie.Poster
        }
    }
    
    return (
        <div className="movie">
            <h2 className="movie-title">{movie.Title}</h2>
        <div>
            <img
                alt={`The movie titled: ${movie.Title}`}
                src={poster()}
            />
        </div>
        <p className="movie-year">{movie.Year}</p>
        </div>
    )
}

export default Movie
