import React from 'react';
// import { useSelector } from 'react-redux';
// import CardChip from '../components/Card/CardChip';
import Button from '../components/Buttons/Button';

function Home() {
  // const { name } = useSelector((state) => state.demo);
  return (
    <>
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
