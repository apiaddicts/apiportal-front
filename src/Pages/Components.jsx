import React from 'react';
import * as MaterialDesign from 'react-icons/md';
import BannerStatic from '../components/Banner/BannerStatic';
import BannerCentered from '../components/Banner/BannerCentered';
import BannerVertical from '../components/Banner/BannerVertical';
import Slider from '../components/Slider/Slider';
import CardBasic from '../components/Card/CardBasic';
import Button from '../components/Buttons/Button';
import Item from '../components/Item/Item';
import Tabs from '../components/Tabs/Tabs';

function Components() {

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
    {
      imgSrc: 'https://picsum.photos/1920/630',
      title: '¡Toda la potencia de una aseguradora en APIs!',
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

  function iconData(name) {
    const md_icon = React.createElement(MaterialDesign[name]);
    if (md_icon.type === undefined) {
      return React.createElement(MaterialDesign['MdApi']);
    }
    return md_icon;
  }

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
        buttonType='primary'
        buttonLabel='empezar ahora'
      />
      <BannerVertical
        title='/API_MARKET SURA'
        list={listItems}
        img='https://picsum.photos/1920/1080'
      />
      <Slider slides={slides} />

      <Item
        icon={iconData('MdHome')}
        title='Lorems'
        type='title'
        description='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat minima blanditiis dolorem assumenda temporibus inventore, unde optio quis earum quos ex, illo pariatur quasi aut officiis fuga ipsum adipisci eius?'
      />
      <Item
        icon={iconData('fulanito')}
        title='Lorems'
        type='title'
        description='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat minima blanditiis dolorem assumenda temporibus inventore, unde optio quis earum quos ex, illo pariatur quasi aut officiis fuga ipsum adipisci eius?'
      />

      <Button type='primary'>
        Ejemplo1
      </Button>
      <Button type='secundary'>
        Ejemplo2
      </Button>
      <Button type='secundary-white'>
        Ejemplo3
      </Button>
      <Button type='ghost'>
        Ejemplo4
      </Button>

      <div style={{
        marginTop: '15px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '2rem',
      }}
      >
        <CardBasic chipTitle='GET' />
        <CardBasic chipTitle='GET' />
        <CardBasic />
      </div>

      <Tabs>
        <div label='Gator'>
          See ya later,
          <em>Alligator</em>
          !
        </div>
        <div label='Cards'>
          <CardBasic chipTitle='GET' />
        </div>
        <div label='Button'>
          <Button type='ghost'>
            Ejemplo4
          </Button>
        </div>
      </Tabs>
    </div>

  );
}

export default Components;
