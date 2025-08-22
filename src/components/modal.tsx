import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal, { ModalProps } from '@mui/material/Modal';
import { styled } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
interface TPropsModal extends ModalProps {
}
const StyleModal = styled(Modal)<TPropsModal>(({theme})=> {
  return {
    "& .MuiBox-root": {
      border: "none",
      color:"#000",
      fontSize: "24px",
      "& .MuiTypography-h6": {
        color: "#000"
      }
    }
  }
})

const  CustomModal= React.forwardRef((props:TPropsModal,ref) => {
  const {open,onClose,children, ...rest}  = props
  // const [open, setOpen] = React.useState(false);
  console.log('check props aaaaaaaaaaaa',props)
 
  return (
    <div>
      <StyleModal
        onClose={onClose} 
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        {...rest}
      >
        <Box sx={style}>
          {children}
        </Box>
      </StyleModal>
    </div>
  );
})

export default CustomModal;