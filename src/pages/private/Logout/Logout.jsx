import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Buttons/Button';
import { logout } from '../../../redux/actions/userAction';

function Logout({ showModal }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(logout());
    navigate(-1);
  };

  const handlerLogout = () => {
    dispatch(logout());
    navigate(-1);
  };

  return (
    <div>
      {' '}
      {showModal && (
        <Dialog
          open={showModal}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle>
            {t('Logout.expiredTitle')}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t('Logout.expiredDescription')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className='container'>
              <div className='row justify-center'>
                <div className='flex-sm-12 flex-md-8'>
                  <Button styles='primary-blue' onClick={handlerLogout}>
                    {t('Logout.exit')}
                  </Button>
                </div>
              </div>
            </div>
          </DialogActions>
        </Dialog>
      )}

    </div>
  );
}

Logout.propTypes = {};

export default Logout;
