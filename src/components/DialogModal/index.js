import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

function DialogModal({onClose, onConfirm, title, description}) {
  const [open, setOpen] = React.useState(true);

  const handleConfirm = () => {
    setOpen(false);
    onConfirm()
  };

  const handleClose = () => {
    setOpen(false);
    onClose()
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleConfirm} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DialogModal.propTypes = {
  onClose: PropTypes.func.isRequired, 
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired, 
  description: PropTypes.string.isRequired
};

export default DialogModal