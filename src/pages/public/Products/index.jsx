import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BannerStatic from '../../../components/Banner/BannerStatic';
import PartnerCard from '../../../components/Card/PartnerCard';
import SubscriptionCard from '../../../components/Card/SubscriptionCard';
import { getSubscriptions } from '../../../redux/actions/productsAction';

function index(props) {

  const dispatch = useDispatch();
  const { subscriptionRes } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getSubscriptions());
  }, []);

  const arrCardSubs = subscriptionRes && Object.keys(subscriptionRes).length > 0 ? subscriptionRes.map((item) => {
    const apis = item.library_apis.map((api) => {
      return {
        title: api.title,
        id: api.id,
      };
    });

    return {
      slug: item.slug,
      title: item.title,
      price: item.price,
      apis,
      btnLabel: item.btnLabel,
      benefits: item?.benefits?.data,
      content: item.content,
      accentColor: item.accentColor,
      iframeSource: item.form,
    };
  }) : [];

  return (
    <div className='div__container__pt'>
      <div>
        <BannerStatic
          title='Subscripciones'
          img='https://picsum.photos/id/1/1440/630'
        />
        <section className='container__fluid section__subs'>
          <div className='row justify-center'>
            {arrCardSubs.map((card, index) => {
              return card.slug === 'partner' ? (
                <div className='flex-sm-12 flex-md-2' key={index}>
                  <PartnerCard title={card.title} content={card.content} />
                </div>
              ) : (
                <div className='flex-sm-12 flex-md-2' key={index}>
                  <SubscriptionCard items={card} />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default index;
