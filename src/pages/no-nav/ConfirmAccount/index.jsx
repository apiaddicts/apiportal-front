import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';
import CustomFooter from '../../../components/common/CustomFooter/CustomFooter';
import Spinner from '../../../components/Spinner';
import { confirmAccount } from '../../../redux/actions/userAction';
import classes from './confirm-account.module.scss';
import SuraLogo from '../../../static/img/logoAlt.svg';

function ConfirmAccount({ setIsOpen }) {

  const accountVerificationSent = useSelector((state) => state.user.accountVerificationSent);

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

  return (
    <div>
      <div className={classes.navbar}>
        <div className={classes.navbar__content}>
          <img src={SuraLogo} alt='' />
        </div>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.wrapper__content}>
          <div className={classes.wrapper__content__text}>
            <div className='container'>
              <div className='row'>
                {queryParams.userId && queryParams.ticket && queryParams.ticketId && queryParams.identity ? (
                  <div className='flex-sm-12 flex-md-12'>
                    <Spinner />
                  </div>
                ) : (
                  <Navigate to='/' replace />
                )}
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
