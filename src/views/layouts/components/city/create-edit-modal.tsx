import { Box } from "@mui/material"
import CustomModal from "src/components/modal"
import { TPramsUpdateProduct } from "src/configs/@type/catalog/product"
import CityUpdateCreateForm from "./CityUpdateCreateForm"

interface TPropCreateEditModal {
  handleClose: () => void
  open: {open:boolean,id:string},
  updateData: TPramsUpdateProduct | null
}
const CreateEditCity = (props:TPropCreateEditModal) => {
  const {handleClose,open,updateData} = props
  
  return (
    <CustomModal onClose={handleClose}   open={open.open}>
        <Box>
          <CityUpdateCreateForm handleClose={handleClose} updateData={updateData} />
        </Box>
      </CustomModal>
  )
}

export default CreateEditCity