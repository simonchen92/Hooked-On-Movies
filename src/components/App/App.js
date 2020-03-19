import React, { useReducer, useEffect } from 'react';
import { reducer, initialState } from '../../store/reducer/index'
import axios from 'axios'
import spinner from '../../assets/ajax-loader.gif'

import './App.css';

import Header from '../Header/Header'
import Movie from '../Movie/Movie'
import SearchMovie from '../SearchMovie/SearchMovie'



const movieAPIURL = 'http://www.omdbapi.com/?s=man&apikey=a20929c9'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    axios.get(movieAPIURL)
    .then(jsonResponse => {
      dispatch({
        type: 'SEARCH_MOVIES_SUCCESS',
        payload: jsonResponse.data.Search
      })
    })
  }, [])

  // refresh page
  // const refreshPage = () => {
  //   window.location.reload()
  // }

  const search = searchValue => {
    dispatch({
      type: 'SEARCH_MOVIES'
    })

    axios(`http://www.omdbapi.com/?s=${searchValue}&apikey=a20929c9`)
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
        <div className="movies">{retreivedMovie()}</div>
      </div>
    </div>
  )
}

export default App;
