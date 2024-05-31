import { Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { collection, getDocs } from 'firebase/firestore'
import { database } from '../firebase'
import { connect } from 'react-redux'
import WatchListMovies from './Watchlist Components/WatchListMovies'
import Loading from "./Loading";

const WatchList = (props) => {
  const {userData} = props
  const [val, setVal] = useState([])
  const value = collection(database, "Users");
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const getData = async()=>{
      setLoading(true)
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false)
    }

    getData();
  }, [])

  const movieList = val.map((element, index)=>{
    if(userData?.displayName == element.Username){
      return <WatchListMovies data={element} key={index}/>
    }
  })

  return (
    <div>
      {loading ? <Loading/> : movieList}
    </div>
  )
}

const mapStateToProps = state => {
  return{
    userData: state.login.userData
  }
}

export default connect(mapStateToProps, null)(WatchList)
