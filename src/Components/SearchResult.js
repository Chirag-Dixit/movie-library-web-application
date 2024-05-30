import { Stack } from '@mui/material'
import React from 'react'
import MovieCard from './MovieCard'

const SearchResult = () => {
  return (
    <Stack direction={'row'} spacing={2}>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
    </Stack>
  )
}

export default SearchResult
