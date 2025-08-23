import { Box } from "@mui/material"
import CustomModal from "src/components/modal"
import DeliveryTypeUpdateCreateForm from "./DeliveryTypeUpdateCreateForm"
import { TPramsUpdateDeliveryType } from "src/configs/@type/delivery-type"

interface TPropCreateEditModal {
  handleClose: () => void
  open: {open:boolean,id:string},
  updateData: TPramsUpdateDeliveryType | null
}
const CreateEditDeliveryType = (props:TPropCreateEditModal) => {
  const {handleClose,open,updateData} = props
  
  return (
    <CustomModal onClose={handleClose}   open={open.open}>
        <Box>
          <DeliveryTypeUpdateCreateForm handleClose={handleClose} updateData={updateData} />
        </Box>
      </CustomModal>
  )
}

export default CreateEditDeliveryType