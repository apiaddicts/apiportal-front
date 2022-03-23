import React from 'react';
// import { useSelector } from 'react-redux';
import CardChip from '../components/Card/CardChip';

function Home() {
  // const { name } = useSelector((state) => state.demo);
  return (
    <>
      <br />
      <br />
      <br />
      <p className='display-4'>Headline Ad</p>
      <br />
      <br />
      <br />
      <br />
      <p className='display-3'>H1 Headline</p>
      <br />
      <br />
      <br />
      <p className='display-2'>H1 Headline</p>
      <br />
      <br />
      <br />
      <p className='display-1'>H1 Headline</p>
      <br />
      <br />
      <br />
      <p className='headline'>H1 Headline</p>
      <br />
      <br />
      <br />
      <p className='title'>H1 Headline</p>
      <p className='title'>H1 Headline</p>
      <div>
        <CardChip title='GET' />
      </div>
    </>
  );
}

export default Home;
