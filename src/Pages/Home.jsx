import React from 'react';
// import { useSelector } from 'react-redux';
// import { MdAccessibilityNew } from 'react-icons/md';
import * as MaterialDesign from 'react-icons/md';
import CardBasic from '../components/Card/CardBasic';
// import Navbar from '../components/Navbar/Navbar';
// import CardChip from '../components/Card/CardChip';
import Button from '../components/Buttons/Button';
import Item from '../components/Item/Item';

function Home() {
  // const { name } = useSelector((state) => state.demo);
  // console.log(md_icon);
  function iconData(name) {
    const md_icon = React.createElement(MaterialDesign[name]);
    if (md_icon.type === undefined) {
      return React.createElement(MaterialDesign['MdApi']);
    }
    return md_icon;
  }

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

      <h1>Cards</h1>
      <hr />
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
      <h1>Items</h1>
      <hr />
      <Item
        // icon={<mdIcon />}
        // icon={iconData('MdApi')}
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

      {/* <ComponeteFulanito
        items={[
          {
            icon: <MdAccessibilityNew />,
            text: 'lorems',
            title: 'titulo',
          },
          {
            icon: <MdAccessibilityNew />,
            text: 'lorems',
            title: 'titulo',
          },
          {
            icon: <MdAccessibilityNew />,
            text: 'lorems',
            title: 'titulo',
          },
        ]}
      /> */}
    </>
  );
}

export default Home;
