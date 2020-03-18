import React from 'react'

const defaultPlaceholderImage = "https://ak4.picdn.net/shutterstock/videos/6309044/thumb/1.jpg"

const Movie = ({ movie }) => {
    const poster = movie.Poster === 'N/A' ? defaultPlaceholderImage : movie.Poster
    return (
        <div className="movie">
            <h2>{movie.Title}</h2>
        <div>
            <img
                width='200'
                alt={`The movie titled: ${movie.Title}`}
                src={poster}
            />
        </div>
        <p>{movie.Year}</p>
        </div>
    )
}

export default Movie
