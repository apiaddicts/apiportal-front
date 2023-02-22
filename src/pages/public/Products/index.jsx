import React from 'react';
import BannerStatic from '../../../components/Banner/BannerStatic';
import SubscriptionCard from '../../../components/Card/SubscriptionCard';

function index(props) {

  const pricingCards = [
    {
      price: 0,
      apis: ['a3Nómina cloud', 'a3factura', 'a3innuva | Nómina', 'a3innuva | Contabilidad'],
      btnLabel: 'Empieza',
      beneficts: ['30 llamadas por minuto', '1.000 llamadas por día', '1 empresa'],
      content: ['Acceso a Wolters Kluwer | developers', 'Análisis y métricas de las APIs', 'Acceso a la documentación de las APIs de Wolters Kluwer', '30 días de prueba gratuita', 'Soporte básico'],
      accentColor: 'primary',
    },
    {
      price: 20,
      apis: ['a3Nómina cloud', 'a3factura', 'a3innuva | Nómina', 'a3innuva | Contabilidad'],
      btnLabel: 'Suscríbete',
      beneficts: ['100 llamadas por minuto', '5.000 llamadas por día', '1 empresa'],
      content: ['Acceso a Wolters Kluwer | developers', 'Análisis y métricas de las APIs', 'Acceso a la documentación de las APIs de Wolters Kluwer', '30 días de prueba gratuita', 'Soporte básico'],
      accentColor: 'secondary',
    },
    {
      price: 150,
      apis: ['a3Nómina cloud', 'a3factura', 'a3innuva | Nómina', 'a3innuva | Contabilidad'],
      btnLabel: 'Suscríbete',
      beneficts: ['1000 llamadas por minuto', '50.000 llamadas por día', '10 empresas'],
      content: ['Acceso a Wolters Kluwer | developers', 'Análisis y métricas de las APIs', 'Acceso a la documentación de las APIs de Wolters Kluwer', '30 días de prueba gratuita', 'Soporte básico'],
      accentColor: 'secondary',
    },
    {
      price: 300,
      apis: ['a3Nómina cloud', 'a3factura', 'a3innuva | Nómina', 'a3innuva | Contabilidad'],
      btnLabel: 'Suscríbete',
      beneficts: ['3000 llamadas por minuto', '150.000 llamadas por día', '30 empresas'],
      content: ['Acceso a Wolters Kluwer | developers', 'Análisis y métricas de las APIs', 'Acceso a la documentación de las APIs de Wolters Kluwer', '30 días de prueba gratuita', 'Soporte básico'],
      accentColor: 'tertiary',
    },
  ];

  return (
    <div className='div__container__pt'>
      <div>
        <BannerStatic
          title='Productos'
          img='https://picsum.photos/id/1/1440/630'
        />
        <section className='container section__subs'>
          <div className='row'>
            {pricingCards.map((card, index) => (
              <div className='flex-sm-12 flex-md-3' key={index}>
                <SubscriptionCard items={card} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default index;
