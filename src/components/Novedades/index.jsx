import React from 'react';
import ItemAvatar from '../Item/ItemAvatar';
// import Contact from '../Contact';
import jsonData from '../../data-fake.json';
// import stylesBlog from '../../styles/pages/blog.module.scss';

function Novedades() {
  return (
    <div>
      {
        jsonData.length === 0 ? <p>No hay resultados</p> :
          jsonData.map((result, index) => (
            <ItemAvatar key={index} title={result.title} paragraph={result.description} img={result.image} border={true} />
          ))
      }
    </div>
  );
}

export default Novedades;
