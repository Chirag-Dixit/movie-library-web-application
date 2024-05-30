import React from 'react'
import MovieCard from './MovieCard'
import { Stack } from '@mui/material'

const UserList = () => {
  return (
    <Stack direction={'row'} spacing={2}>
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
    </Stack>
  )
}

export default UserList
