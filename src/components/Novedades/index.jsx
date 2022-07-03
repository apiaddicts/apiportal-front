import React from 'react';
import { Link } from 'react-router-dom';
import ItemAvatar from '../Item/ItemAvatar';
import classes from './styles.module.scss';

console.log(classes);

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // eslint-disable-next-line no-param-reassign
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

function Novedades({ data }) {
  const items = data ? shuffle(data) : [];
  return (
    <div>
      {
        items.length === 0 ? <p>Información no disponible</p> :
          items.slice(0, 4).map((result, index) => (
            <Link key={index} to={`/blog/${result?.id}`}>
              <ItemAvatar title={result?.title} paragraph={result?.description} img={result?.image ? result?.image?.[0]?.url : ''} border={true} css_styles={{ 'custom_title': 'fs__10', 'custom_paragraph': `fs__16 ${classes.description}` }} />
            </Link>
          ))
      }
    </div>
  );
}

export default Novedades;
