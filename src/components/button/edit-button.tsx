import { Button } from "@mui/material"
interface TEditButton {
  handleEdit: () => void
}
const EditButton = (props:TEditButton) => {
    const {handleEdit} = props
  return (
    <>
      <Button
        onClick={handleEdit}
        variant="contained"
      >
        Edit
      </Button>
    </>
  )
}

export default EditButton