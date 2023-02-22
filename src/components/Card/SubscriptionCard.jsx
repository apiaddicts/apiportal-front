import React from 'react';
import { Link } from 'react-router-dom';
import Base from './Base';
//import CustomMarkdown from '../CustomMarkdown';
import Button from '../Buttons/Button';

function SubscriptionCard({ items }) {

  const { price, apis, beneficts, content, btnLabel, accentColor } = items;

  return (
    <Base>
      <div className='container'>
        <div className='price'>
          {price > 0 ? (
            <div className='price__wrapper'>
              <p className={accentColor === 'primary' ? 'text' : accentColor === 'secondary' ? 'text__secondary' : accentColor === 'tertiary' ? 'text__tertiary' : ''}>{`${price}€`}</p>
              <p className='price__wrapper__month'>/mes</p>
            </div>
          ) : (<p className={accentColor === 'primary' ? 'text' : ''}>{`${price}€`}</p>)}
          <div className='mt-5'>
            <Button styles='primary'>
              {btnLabel}
            </Button>
          </div>
        </div>
        <div className='apis'>
          <p className='mb-2 apis__title'>Contiene las APIS de:</p>
          {apis.map((item, index) => (
            <Link to='/' className='apis__link' key={index}>{item}</Link>
          ))}
        </div>
        <ul className='benefits'>
          {beneficts.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className='content'>
          <p className='mb-2 apis__title'>Características:</p>
          <ul className='markdown'>
            {/* <CustomMarkdown content={content} /> */}
            {content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Base>
  );
}

export default SubscriptionCard;
