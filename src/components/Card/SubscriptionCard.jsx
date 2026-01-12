import React from 'react';
//import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Base from './Base';
//import CustomMarkdown from '../CustomMarkdown';
import Button from '../Buttons/Button';
import { useTranslation } from 'react-i18next';

function SubscriptionCard({ items, setOpenForm }) {
  const { t } = useTranslation();

  const { title, price, /*apis, */benefits, slug, btnLabel, accentColor } = items;

  return (
    <Base css_styles={{ 'override_card_height': 'custom_card__public_subscription' }}>
      <div className='card__wrapper__subs'>
        <div className='container'>
          <div className='price'>
            <div className='price__title'>
              <h1>{title}</h1>
            </div>
            {price > 0 ? (
              <div className='price__wrapper'>
                <p className={accentColor === 'primary' ? 'text' : accentColor === 'secondary' ? 'text__secondary' : accentColor === 'tertiary' ? 'text__tertiary' : ''}>{`${price}€`}</p>
                <p className='price__wrapper__month'>{t('SubscriptionCard.perMonth')}</p>
              </div>
            ) : (<p className={accentColor === 'primary' ? 'text' : ''}>{`${price}€`}</p>)}
            {btnLabel && (
              <div className='mt-5'>
                {slug === 'starter' ? (
                  <Button styles='primary' onClick={() => { setOpenForm(true); }}>
                    {btnLabel}
                  </Button>
                ) : (
                  <HashLink smooth to={`/suscripciones/${slug}`}>
                    <Button styles='primary'>
                      {btnLabel}
                    </Button>
                  </HashLink>
                )}
              </div>
            )}
          </div>
          {/*apis && (
            <div className='apis'>
              <p className='mb-2 apis__title'>Contiene las APIS de:</p>
              {apis.map((item, index) => (
                <Link to={`/apis/${item.id}#api`} className='apis__link' key={index}>{item.title}</Link>
              ))}
            </div>
          )*/}
          <div className='apis'>
            <p className='mb-2 apis__title'>{t('SubscriptionCard.containsApis')}</p>
            <p className='apis__link'>a3Nómina cloud · a3factura</p>
            <p className='apis__link'>a3innuva | Facturación</p>
            <p className='apis__link'>a3innuva | Nómina</p>
            <p className='apis__link'>a3innuva | Contabilidad</p>
          </div>
          {benefits && benefits.general && (
            <ul className='benefits'>
              {benefits?.general.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          {benefits && benefits.specific && (
            <div className='content'>
              <p className='mb-2 apis__title'>{t('SubscriptionCard.features')}</p>
              <ul>
                {benefits?.specific.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {slug === 'enterprise-l' ? (
          <div className='expand__subs'>
            <p>{t('SubscriptionCard.expandSubscription')}</p>
            <span>{t('SubscriptionCard.packDetails')}</span>
            <div className='container mt-5'>
              <HashLink smooth to={`/suscripciones/${slug}/contact`}>
                <Button styles='primary'>
                  {t('SubscriptionCard.contactUs')}
                </Button>
              </HashLink>
            </div>
          </div>
        ) : null}
      </div>
    </Base>
  );
}

export default SubscriptionCard;
