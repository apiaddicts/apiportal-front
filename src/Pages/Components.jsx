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
import Chip from '../components/Chip/Chip';
import Input from '../components/Input';
import CardInformation from '../components/Card/CardInformation';
import jsonData from '../data-fake.json';
import AccordionFilter from '../components/Accordion/AccordionFilter';
import IconM from '../components/GoogleIcon';
import icons from '../static/icons-sura';

function Components() {

  const buttonsTags = [
    { class: 'gray', label: 'APIS' },
    { class: 'gray', label: 'Desarroladores' },
    { class: 'gray', label: 'Desarroladores' },
    { class: 'gray', label: 'Desarroladores' },
  ];

  const buttons = [
    { label: 'Probar Api', class: 'primary' },
    { label: 'Documentación', class: 'secundary' },
  ];

  const metodosHTTP = [
    { label: 'POST' },
    { label: 'PUSH' },
    { label: 'GET' },
    { label: 'DEL' },
    { label: 'PUT' },
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

  const items = [
    {
      title: 'Titulo 1',
      questions: ['Titulo1.1', 'Titulo1.2', 'Titulo1.3'],
    },
    {
      title: 'Titulo 2',
      questions: ['Titulo2.1', 'Titulo2.2', 'Titulo2.3', 'Titulo2.4', 'Titulo2.5'],
    },
    {
      title: 'Titulo 3',
      questions: ['Titulo3.1', 'Titulo3.2'],
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
      <div style={{
        width: '80%',
        margin: 'auto',
        padding: '50px',

      }}
      >
        <p className='h1'>
          Chips con Métodos de petición HTTP
        </p>
        {metodosHTTP.map((metodo) => (
          <Chip title={metodo.label} className={metodo.label.toLowerCase()} key={metodo.name} />
        ))}
        <p className='h1'>
          Chips perzonalizado
        </p>

        <Chip title='Desarrolladores' className='gray' />

        <p className='h1'>
          Inputs reutilizables
        </p>
        <Input type='text' placeholder='Nombre' />

        <Input type='email' placeholder='Email' />

        <Input type='password' placeholder='Password' />

        <p className='h1'>
          Componente Card information
        </p>

        <div style={{
          width: '40%',
          display: 'flex',
          flexWrap: 'wrap',
          margin: 'auto',
        }}
        >
          {jsonData.map((result) => (
            <CardInformation
              img={result.image}
              description={result.description}
              title={result['titl:e']}
              buttons={buttonsTags}
            />

          ))}

        </div>
        <p className='h1'>
          Componente Accordion de items
        </p>
        <AccordionFilter items={items} />

        <p className='h1'>
          Componente Accordion
        </p>
      </div>
      <div>
        <IconM iconoName='person_outline' iconColor='#000' />
      </div>
      <div>
        {icons('person')}
      </div>
    </div>

  );
}

export default Components;
