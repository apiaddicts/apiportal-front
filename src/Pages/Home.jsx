import React from 'react';
// import { useSelector } from 'react-redux';
// import CardChip from '../components/Card/CardChip';
import Navbar from '../components/Navbar/Navbar';
import Button from '../components/Buttons/Button';

function Home() {
  // const { name } = useSelector((state) => state.demo);
  return (
    <>
      <Navbar />
      {/* <span>Headings</span>
      <p className="display-4">Headline Ad</p>
      <p className="display-3">H1 Headline</p>
      <p className="display-2">H1 Headline</p>
      <p className="display-1">H1 Headline</p>
      <p className="headline">H1 Headline</p>
      <p className="title">H1 Headline</p>
    <p className="title">H1 Headline</p>
      <p className='title'>H1 Headline</p>
    */}

      <Button type='primary'>
        Ejemplo1
      </Button>
      <br />
      <Button type='secundary'>
        Ejemplo2
      </Button>
      <br />
      <Button type='secundary-white'>
        Ejemplo3
      </Button>
      <br />
      <Button type='ghost'>
        Ejemplo4
      </Button>
    </>
  );
}

export default Home;
