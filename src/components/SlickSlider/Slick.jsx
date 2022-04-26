/* eslint-disable import/no-unresolved */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Icon from '../MdIcon/Icon';
import CardBasic from '../Card/CardBasic';

export default function SimpleSlider(slides) {

  const imgs = [
    { img: 'https://images.unsplash.com/photo-1640955014216-75201056c829?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80' },
    { img: 'https://images.unsplash.com/photo-1648737153811-69a6d8c528bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' },
    { img: 'https://images.unsplash.com/photo-1515086828834-023d61380316?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80' },
    { img: 'https://images.unsplash.com/photo-1515432085503-cabf2fbcd690?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80' },
    { img: 'https://images.unsplash.com/photo-1643297654395-d6375d07215c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=832&q=80' },
    { img: 'https://images.unsplash.com/photo-1576089172869-4f5f6f315620?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=926&q=80' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <Slider {...settings}>
      {imgs.map((src, i) => (
        <div key={i} className='mr-10'>
          <CardBasic info='MÁS INFORMACIÓN' img={src.img} title={`title ${i}`} description=' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis ab voluptatum nisi alias veniam nesciunt facere non culpa itaque architecto ipsam iusto, repellat est sit? Esse et id vero ut! Lorem ipsum dolor, sit amet ' />
        </div>
      ))}
    </Slider>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <span
      className={className}
      style={{ display: 'block', background: 'red' }}
      onClick={onClick}
      role='menuitem'
      tabIndex='0'
    >
      <Icon id='MdChevronLeft' />
    </span>
  );
}
function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <span
      className={className}
      style={{ display: 'block', background: 'red' }}
      onClick={onClick}
      role='menuitem'
      tabIndex='0'
    >
      <Icon id='MdChevronRight' />
    </span>
  );
}
