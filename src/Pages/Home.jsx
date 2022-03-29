import React from 'react';
import BannerStatic from '../components/Banner/BannerStatic';
import BannerCentered from '../components/Banner/BannerCentered';
import BannerVertical from '../components/Banner/BannerVertical';
import Slider from '../components/Slider/Slider';
// import { useSelector } from 'react-redux';
// import CardChip from '../components/Card/CardChip';
// import Button from '../components/Buttons/Button';

function Home() {
  // const { name } = useSelector((state) => state.demo);

  const buttons = [
    { label: 'Probar Api', class: 'primary' },
    { label: 'Documentación', class: 'secundary' },
  ];

  const listItems = [
    { iconName: 'MdStackedBarChart', label: 'Analiticas de negocio' },
    { iconName: 'MdCheck', label: 'Todo tipo de seguros' },
    { iconName: 'MdDesktopMac', label: 'Recursos y documentación para developers' },
  ];

  const slides = [
    { imgSrc: 'https://picsum.photos/1920/300', title: 'Slide 1', subtitle: 'ullam sint fugiat' },
    { imgSrc: 'https://picsum.photos/1920/300', title: 'Slide 2', subtitle: 'similique expedita harum' },
    { imgSrc: 'https://picsum.photos/1920/300', title: 'Slide 3', subtitle: 'consequatur consequatur consequatur' },
    { imgSrc: 'https://picsum.photos/1920/300', title: 'Slide 4', subtitle: 'eligendi numquam rerum' },
  ];
  return (
    <div>
      <BannerStatic
        title='Biblioteca de APIs'
        img='https://picsum.photos/1920/300'
        subtitle='Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi dolores dolor perspiciatis tempora omnis, a repudiandae nobis dignissimos quod maxime id iure dolore, accusantium quis assumenda minima magnam nihil aut.'
        buttons={buttons}
      />
      <BannerCentered
        title='Integra tus sistemas con las APIs de SURA'
        subtitle='Lorem ipsum dolor sit amet.'
        img='https://picsum.photos/1920/300'
        buttonType='secundary'
        buttonLabel='empezar ahora'
      />
      <BannerVertical
        title='/API_MARKET SURA'
        list={listItems}
        img='https://picsum.photos/1920/1080'
      />
      <Slider slides={slides} />
    </div>
  );
}

export default Home;
