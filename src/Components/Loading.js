import { CircularProgress, Stack, Typography } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    <Stack>
      <CircularProgress size={50} sx={{ my: 1 }}/>
    </Stack>
  )
}

export default Loading