import React, { useReducer, useEffect } from 'react';
import { reducer, initialState } from '../../store/reducer/index'
import axios from 'axios'
import spinner from '../../assets/ajax-loader.gif'

import './App.scss';

import Header from '../Header/Header'
import Movie from '../Movie/Movie'
import SearchMovie from '../SearchMovie/SearchMovie'

const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    axios.get(`http://www.omdbapi.com/?s=Avengers&apikey=${omdbApiKey}`)
    .then(jsonResponse => {
      dispatch({
        type: 'SEARCH_MOVIES_SUCCESS',
        payload: jsonResponse.data.Search
      })
    })
  }, [])

  const search = searchValue => {
    dispatch({
      type: 'SEARCH_MOVIES'
    })

    axios.post(`http://www.omdbapi.com/?s=${searchValue}&apikey=${omdbApiKey}`)
    .then(jsonResponse => {
      if(jsonResponse.data.Response === 'True') {
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: jsonResponse.data.Search
        })
      } else {
        dispatch({
          type: 'SEARCH_MOVIES_FAILURE',
          error: jsonResponse.data.Error
        })
      }
      console.log(jsonResponse)
    })
  }

  const { movies, errorMessage, loading } = state

  const retreivedMovie = () => {
  if (loading && !errorMessage) {
      return <img className="spinner" src={spinner} alt="Loading spinner" />
  } else if (errorMessage) {
      return <div className="errorMessage">{errorMessage}</div>
    } else {
        return movies.map((movie, index) => {
          return <Movie key={`${index}`} movie={movie} />
        })
    }
  }

  return (
    <div className='App'>
      <div className='movie-container'>
        <Header text='Hooked On Movies' />
        <SearchMovie search={search} />
        <p className='App-intro'>Sharing a few of my favorite movies</p>
        <div className="movie">{retreivedMovie()}</div>
      </div>
    </div>
  )
}

export default App;
