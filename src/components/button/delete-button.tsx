import { Button } from "@mui/material"

interface TDeleteButton {
  handDelete: () => void
}
const DeleteButton = (props:TDeleteButton) => {
  const {handDelete} = props
  
  return (
    <>
      <Button
        onClick={handDelete}
        variant="contained"
      >
        Delete
      </Button>
    </>
  )
}
export default DeleteButton