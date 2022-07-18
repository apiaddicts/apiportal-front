import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import Button from '../../../components/Buttons/Button';
import { logout } from '../../../redux/actions/userAction';

function Logout({ showModal, setShowModal }) {

  const handleClose = () => {
    setShowModal(false);
  };

  const dispatch = useDispatch();

  const handlerLogout = () => {
    dispatch(logout());
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
            Sesión caducada
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tu sesión ha excedido el tiempo de actividad. Necesitas iniciar sesión nuevamente.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className='container'>
              <div className='row justify-center'>
                <div className='flex-sm-12 flex-md-8'>
                  <Button styles='primary-blue' onClick={handlerLogout}>
                    Salir
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
