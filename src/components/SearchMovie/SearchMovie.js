import React, { useState } from 'react'
import './Search.scss'

const Search = (props) => {
    const [searchValue, setSearchValue] = useState('')

    const handleSearchInputChange = event => {
        setSearchValue(event.target.value)
    }
    
    const resetInputValue = () => {
        setSearchValue('')
    }

    const searchFunction = event => {
        event.preventDefault()
        props.search(searchValue)
        resetInputValue()
    }

    return (
        <form className='SearchForm'>
            <input
                value={searchValue}
                onChange={handleSearchInputChange}
                type='text'
            />
            <input onClick={searchFunction} value='search' type='submit'/>
        </form>
    )
}

export default Search