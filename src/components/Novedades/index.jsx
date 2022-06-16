import React from 'react';
import { Link } from 'react-router-dom';
import ItemAvatar from '../Item/ItemAvatar';

function Novedades({ data }) {
  const items = data.sort(() => 0.5 - Math.random());
  return (
    <div>
      {
        data.length === 0 ? <p>Información no disponible</p> :
          items.slice(0, 4).map((result, index) => (
            <Link key={index} to={`/blog/${result.id}`}>
              <ItemAvatar title={result.title} paragraph={result.description} img={result.image ? result.image[0].url : ''} border={true} css_styles={{ 'custom_title': 'fs__10', 'custom_paragraph': 'fs__16' }} />
            </Link>
          ))
      }
    </div>
  );
}

export default Novedades;
