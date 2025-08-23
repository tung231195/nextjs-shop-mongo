import { Box } from "@mui/material"
import CustomModal from "src/components/modal"
import PaymentTypeUpdateCreateForm from "./PaymentTypeUpdateCreateForm"
import { TPramsUpdatePaymentType } from "src/configs/@type/payment-type"

interface TPropCreateEditModal {
  handleClose: () => void
  open: {open:boolean,id:string},
  updateData: TPramsUpdatePaymentType | null
}
const CreateEditPaymentType = (props:TPropCreateEditModal) => {
  const {handleClose,open,updateData} = props
  
  return (
    <CustomModal onClose={handleClose}   open={open.open}>
        <Box>
          <PaymentTypeUpdateCreateForm handleClose={handleClose} updateData={updateData} />
        </Box>
      </CustomModal>
  )
}

export default CreateEditPaymentType