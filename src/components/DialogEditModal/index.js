import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

function DialogEditModal({onClose, onConfirm, title, description, children}) {
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {description}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DialogEditModal.propTypes = {
  onClose: PropTypes.func.isRequired, 
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired, 
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default DialogEditModal