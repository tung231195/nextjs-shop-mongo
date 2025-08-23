import { Box } from "@mui/material"
import CustomModal from "src/components/modal"
import { TPramsUpdateProduct } from "src/configs/@type/catalog/product"
import ProductTypeCreateUpdateForm from "./ProductTypeCreateUpdateForm"

interface TPropCreateEditModal {
  handleClose: () => void
  open: {open:boolean,id:string},
  updateData: TPramsUpdateProduct | null
}
const CreateEditTypeModal = (props:TPropCreateEditModal) => {
  const {handleClose,open,updateData} = props
  
  return (
    <CustomModal onClose={handleClose}   open={open.open}>
        <Box>
          <ProductTypeCreateUpdateForm handleClose={handleClose} updateData={updateData} />
        </Box>
      </CustomModal>
  )
}

export default CreateEditTypeModal