import { Card, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
/*import { Navigate } from 'react-router-dom';*/
import CustomFooter from '../../../components/common/CustomFooter/CustomFooter';
import Spinner from '../../../components/Spinner';
import { confirmAccount } from '../../../redux/actions/userAction';
import classes from './confirm-account.module.scss';
/*import LogoAlt from '../../../static/img/logoAlt.svg';*/

function ConfirmAccount({ setIsOpen }) {

  const { accountVerificationSent, accountVerified, accountVerifiedResponse } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const queryParams = {
    userId: searchParams.get('userid'),
    ticketId: searchParams.get('ticketid'),
    ticket: searchParams.get('ticket'),
    identity: searchParams.get('identity'),
  };

  useEffect(() => {
    if (queryParams.userId && queryParams.ticket && queryParams.ticketId && queryParams.identity && !accountVerificationSent) {
      dispatch(confirmAccount(queryParams, setIsOpen));
    }
  }, [accountVerificationSent]);

  const msg = accountVerifiedResponse && Object.keys(accountVerifiedResponse).length > 0 ? accountVerifiedResponse?.result : 'Su cuenta ha sido verificada y se encuentra pendiente de aprobacion';

  return (
    <div>
      <div className={classes.navbar} />
      <div className={classes.wrapper}>
        <div className={classes.wrapper__content}>
          <div className={classes.wrapper__content__text}>
            <div className='container'>
              <div className='row'>
                <div className='flex-sm-12 flex-md-12'>
                  {accountVerified ? (<Spinner />) : (
                    <Container fixed className='container__padding'>
                      <Card sx={{ borderRadius: '20px', marginTop: '20px', padding: '35px 47px 43px 41px', marginBottom: '15px', width: '100%' }}>
                        <p className='fs__24 font-weight-bold text__primary'>{msg}</p>
                        <div className='row justify-center'>
                          <div className='flex-sm-12 flex-md-6 flex-lg-6'>
                            <Link to='/' style={{ textDecoration: 'underline', fontWeight: 500 }}>
                              Ir al inicio
                            </Link>
                          </div>
                        </div>
                      </Card>

                    </Container>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomFooter />
    </div>
  );
}

ConfirmAccount.propTypes = {};

export default ConfirmAccount;
