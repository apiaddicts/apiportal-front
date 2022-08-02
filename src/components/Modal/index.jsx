import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { resetAlert } from '../../redux/actions/userAction';
import './modal.module.scss';

function Modal({ children, setOpen, maxWidth = 'sm' }) {

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={setOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth={maxWidth}
      fullWidth={true}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, zIndex: 1 }}
      >
        <IconButton
          onClick={() => { handleClose(); dispatch(resetAlert()); }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#53565A',
            fontSize: '20px',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
    // <div className={`${classes.modal} w-screen h-screen`}>
    //   <div className={classes.modal__content}>
    //     {children}
    //   </div>
    // </div>
  );
}

export default Modal;
