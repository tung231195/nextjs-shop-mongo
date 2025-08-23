import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import  { DialogContentProps } from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface TpropAlertConfirm extends DialogContentProps {
  open:boolean,
  handleClose:() => void
}
const CustomAlertDialog =(props:TpropAlertConfirm) =>  {
  const {open, handleClose, children} = props

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        {children}
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default  CustomAlertDialog;