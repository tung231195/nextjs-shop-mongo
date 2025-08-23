import { TextFieldProps,TextField, styled } from "@mui/material"

const TextFieldStyle = styled(TextField)<TextFieldProps>((theme)=>{

  return {
    "& .MuiOutlinedInput-root" : {
      color:theme.theme.palette.grey
      
    },
    "& .MuiInputLabel-root" : {
      color:"blue",
      WebkitTransform:"none",
      transform: "none",
      position: "relative",
      lineHeight:1.2
      
    }
  
  }
});

const CustomTextField = (props: TextFieldProps) => {
  const {size='small', InputLabelProps} = props;

  return <TextFieldStyle   size ={size}  InputLabelProps = {{...InputLabelProps}} {...props} />
}

export default CustomTextField
