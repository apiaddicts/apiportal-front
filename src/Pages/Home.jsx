import React from 'react'
import { useSelector } from 'react-redux'

export const Home = () => {
  const { name } = useSelector(state => state.demo)
  return (
    <>
    <br /><br /><br />
      <p className="headline-ad">Headline Ad</p><br /><br /><br /><br />
      <p className="h1-headline">H1 Headline</p><br /><br /><br />
      <p className="h2-headline">H1 Headline</p><br /><br /><br />
      <p className="h3-headline">H1 Headline</p><br /><br /><br />
      <p className="h4-headline">H1 Headline</p><br /><br /><br />
      <p className="h4-headline">H1 Headline</p>
    </>
    
  )
}
