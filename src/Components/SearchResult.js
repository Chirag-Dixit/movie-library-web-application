import { Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { connect } from 'react-redux'
import Loading from "./Loading";

const SearchResult = (props) => {
  const search = 'boyhood'
  const [temp, setTemp] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(()=>{


    const getMovieData = async() => {
      setLoading(true)
      const data = await fetch(`http://www.omdbapi.com/?s=${props.search}&type=movie&apikey=790948c6`)
      const movies = await data.json();
      setTemp(movies.Search);
      console.log(movies.Search)
      setLoading(false)
    }

    getMovieData();
  }, [props.search])

  console.log(temp)
  const moviesList = temp?.map((element, index)=>{
    return <MovieCard data={element} key={index}/>
  })

  return (
    <Stack direction={'row'} sx={{
      width: 'fit-content',
      padding: '10px',
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      alignItems: 'center',
      // columnGap: '50px',
      gap: '30px',
    }}>
      {loading? <Loading/> : moviesList}
      
    </Stack>
  )
}

const mapStateToProps = state =>{
  return{
    search: state.search.value,
  }
}

export default connect(mapStateToProps, null)(SearchResult)
