import React from 'react';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { HashLink } from 'react-router-hash-link';
import CustomMarkdown from '../CustomMarkdown';
import Base from './Base';
import Button from '../Buttons/Button';
import { useTranslation } from 'react-i18next';

function PartnerCard(props) {
  const { title, content, slug } = props;
  const { t } = useTranslation();

  return (
    <Base css_styles={{ 'override_card_height': 'custom_card__public_subscription' }}>
      <div className='card__wrapper__subs'>
        <div className='container'>
          <div className='partner price__title'>
            <h1>{title}</h1>
          </div>
          <div className='partner__img'>
            <HandshakeIcon sx={{ fontSize: 100 }} />
          </div>
          <div className='mt-5'>
            <HashLink smooth to={`/suscripciones/${slug}`}>
              <Button styles='primary'>{t('PartnerCard.contactUs')}</Button>
            </HashLink>
          </div>
          <div className='mt-5 mb-2 partner__markdown'>
            <CustomMarkdown content={content} />
          </div>
        </div>
      </div>
    </Base>
  );
}

PartnerCard.propTypes = {};

export default PartnerCard;
