import React from 'react';
import HandshakeIcon from '@mui/icons-material/Handshake';
import CustomMarkdown from '../CustomMarkdown';
import Base from './Base';
import Button from '../Buttons/Button';

function PartnerCard(props) {
  const { title, content } = props;
  return (
    <Base>
      <div className='container'>
        <div className='partner price__title'>
          <h1>{title}</h1>
        </div>
        <div className='partner__img'>
          <HandshakeIcon sx={{ fontSize: 100 }} />
        </div>
        <div className='mt-5'>
          <Button styles='primary'>
            Contáctanos
          </Button>
        </div>
        <div className='mt-5 mb-2 partner__markdown'>
          <CustomMarkdown content={content} />
        </div>
      </div>
    </Base>
  );
}

PartnerCard.propTypes = {};

export default PartnerCard;
