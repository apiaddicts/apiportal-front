import React from 'react'
import { useSelector } from 'react-redux'

export const Home = () => {
  const { name } = useSelector(state => state.demo)
  return (
    <>
      <h1>{name}</h1>
     {/* <div>{name}</div>
      <button>click</button> */}
    </>
    
  )
}
