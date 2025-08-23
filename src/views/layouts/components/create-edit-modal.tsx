import { Box } from "@mui/material"
import CustomModal from "../../../components/modal"
import ProductCreateUpdateForm from "src/views/layouts/components/catalog/ProductCreateUpdateForm"
import { TPramsUpdateProduct } from "src/configs/@type/catalog/product"

interface TPropCreateEditModal {
  handleClose: () => void
  open: {open:boolean,id:string},
  updateData: TPramsUpdateProduct | null
}
const CreateEditModal = (props:TPropCreateEditModal) => {
  const {handleClose,open,updateData} = props
  
  return (
    <CustomModal onClose={handleClose}   open={open.open}>
        <Box>
          <ProductCreateUpdateForm handleClose={handleClose} updateData={updateData} />
        </Box>
      </CustomModal>
  )
}

export default CreateEditModal