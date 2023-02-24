import React from 'react';
import { Link } from 'react-router-dom';
import Base from './Base';
import CustomMarkdown from '../CustomMarkdown';
import Button from '../Buttons/Button';

function SubscriptionCard({ items }) {

  const { price, apis, benefits, content, btnLabel, accentColor } = items;

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
          {btnLabel && (
            <div className='mt-5'>
              <Button styles='primary'>
                {btnLabel}
              </Button>
            </div>
          )}
        </div>
        {apis && (
          <div className='apis'>
            <p className='mb-2 apis__title'>Contiene las APIS de:</p>
            {apis.map((item, index) => (
              <Link to='/' className='apis__link' key={index}>{item}</Link>
            ))}
          </div>
        )}
        {benefits && (
          <ul className='benefits'>
            {benefits.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
        {content && (
          <div className='content'>
            <p className='mb-2 apis__title'>Características:</p>
            <CustomMarkdown content={content} />
          </div>
        )}
      </div>
    </Base>
  );
}

export default SubscriptionCard;
