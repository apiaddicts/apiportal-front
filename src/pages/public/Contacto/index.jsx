import React from 'react';
import classes from './contacto.module.scss';

function Contacto(props) {

  return (
    <div className={classes.contact}>
      <iframe
        className={classes.contact__iframe}
        title='Contact Form'
        src='https://forms.office.com/Pages/ResponsePage.aspx?id=kWzHivHn_0GonDVTstosF8g3aEk_p3xEtQ9xfKeMn9lUODBPS0kyTEk3UlVSWEFaVEtHRjgxRlNSVy4u&embed=true'
      />
    </div>
  );
}

export default Contacto;
