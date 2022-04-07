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
import CardSlider from '../components/Card/CardSlider';
import ItemAvatar from '../components/Item/ItemAvatar';

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

  const cardSlides = [
    {
      title: 'Ejemplo 1',
      description: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis ab voluptatum nisi alias veniam nesciunt facere non culpa itaque architecto ipsam iusto, repellat est sit? Esse et id vero ut! Lorem ipsum dolor, sit amet consectetur adipisicing elit.Minima repudiandae dolorum, explicabo delectus dolor, deserunt molestias placeat, itaque est esse laborum modi et aliquid.Consectetur dolores nostrum quo eius beatae.',
      icon: 'Md3DRotation',
      titleFooter: 'Tallah Cotton',
      descriptionFooter: 'Cargo',
    },
    {
      title: 'Ejemplo 2',
      description: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis ab voluptatum nisi alias veniam nesciunt facere non culpa itaque architecto ipsam iusto, repellat est sit? Esse et id vero ut! Lorem ipsum dolor, sit amet consectetur adipisicing elit.Minima repudiandae dolorum, explicabo delectus dolor, deserunt molestias placeat, itaque est esse laborum modi et aliquid.Consectetur dolores nostrum quo eius beatae.',
      icon: 'MdAspectRatio',
      titleFooter: 'Tallah Cotton',
      descriptionFooter: 'Ejemplo',
    },
    {
      title: 'Ejemplo 3',
      description: ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis ab voluptatum nisi alias veniam nesciunt facere non culpa itaque architecto ipsam iusto, repellat est sit? Esse et id vero ut! Lorem ipsum dolor, sit amet consectetur adipisicing elit.Minima repudiandae dolorum, explicabo delectus dolor, deserunt molestias placeat, itaque est esse laborum modi et aliquid.Consectetur dolores nostrum quo eius beatae.',
      icon: 'MdContactless',
      titleFooter: 'Tallah Cotton',
      descriptionFooter: 'Desarrollo',
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
      <BannerStatic
        title='sed omnis maxime'
        img='https://picsum.photos/1920/300'
        subtitle='Sapiente sit consequatur perspiciatis inventore. Quidem eveniet voluptas.'
        isSearch={true}
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
        number='0. Lorems'
        description='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat minima blanditiis dolorem assumenda temporibus inventore, unde optio quis earum quos ex, illo pariatur quasi aut officiis fuga ipsum adipisci eius?'
      />
      <Item
        icon={iconData('fulanito')}
        title='Lorems'
        type='title'
        number='1. Lorems'
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
      <br />
      <CardSlider lists={cardSlides} />

      <div className='content-demo'>
        <ItemAvatar title='Tu Salud - Lectura de 12 min.' paragraph='Quisque rutrum. Sed auge ipsum, egestas nec, vesti bulum.' img='https://picsum.photos/id/1005/150/150' />
      </div>
    </div>

  );
}

export default Components;
