import React from 'react';
import Slider from '../components/Slider/Slider';

function Home() {

  const slides = [
    {
      imgSrc: 'https://picsum.photos/1920/630',
      title: 'Slide 1',
      subtitle: 'ullam sint fugiat',
      actionButtons: [
        {
          label: 'Empezar ahora',
          type: 'primary',
        },
        {
          label: 'Ver APIS',
          type: 'ghost',
        },
      ],
    },
  ];

  return (
    <div>
      <Slider slides={slides} />
    </div>

  );
}

export default Home;
