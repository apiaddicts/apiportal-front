import { Card, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import CustomMarkdown from '../../../components/CustomMarkdown';
import Markdown from '../../../components/CustomMarkdown/Markdown';
import Title from '../../../components/Title';
import gettingStartedActions from '../../../redux/actions/gettingStartedAction';

function index(props) {

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.started);

  useEffect(() => {
    dispatch(gettingStartedActions.gettingStarted());
  }, []);

  return (
    <Container fixed className='container__padding'>
      <div className='grid__container'>
        <div className='wrapper__title'>
          <Title text='Comencemos' />
        </div>
      </div>
      <Card sx={{ borderRadius: '20px', marginTop: '20px', padding: '35px 47px 43px 41px', marginBottom: '15px', width: '100%' }}>
        {data && Object.keys(data).length > 0 ? data?.contentSections.map((item, index) => (
          <Markdown content={item.content} key={index} />
        )) : null}
      </Card>
    </Container>
  );
}

export default index;
