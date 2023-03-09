import React from 'react';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { HashLink } from 'react-router-hash-link';
import CustomMarkdown from '../CustomMarkdown';
import Base from './Base';
import Button from '../Buttons/Button';

function PartnerCard(props) {
  const { title, content, slug } = props;
  return (
    <Base>
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
              <Button styles='primary'>Contáctanos</Button>
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
