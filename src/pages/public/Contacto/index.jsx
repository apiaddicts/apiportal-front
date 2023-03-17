import React from 'react';
import classes from './contacto.module.scss';

function Contacto(props) {

  return (
    <div className={classes.contact}>
      <iframe
        className={classes.contact__iframe}
        title='Contact Form'
        src='https://forms.office.com/pages/responsepage.aspx?id=kWzHivHn_0GonDVTstosF9LJZ4ctACBMskZ9JKMrGD5UOVQ0WldOUkk4TU9WTDNOVkdQTkhXTklVTy4u&embed=true'
      />
    </div>
  );
}

export default Contacto;
