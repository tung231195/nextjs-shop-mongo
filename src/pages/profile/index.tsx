import { Avatar, Box, Button, FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useRef, useState } from "react";
import CustomSelectField from "src/components/select-field";
import CustomTextField from "src/components/text-field"
import { _fileToBase64 } from "src/helpers/profile";
import { useAuth } from "src/hooks/useAuth";
import { updateProfile } from "src/service/auth";

const MyProfile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string>("");
  const inputHref = useRef<HTMLInputElement>(null);
  const [role, setRole] = useState("");
  const {user} = useAuth();
  const handleSubmitProfile = (event:any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(file) {
      data.append('file',file);
    }
    const userData = {
        avatar
    }
     updateProfile(userData); 
    console.log('check data',data,data.get('email'));
  };

  const handleFileUpload = () => {
      inputHref.current?.click();
  };


  const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {

      if (e.target.files) {
        const toBase64 =  await _fileToBase64(e.target.files[0]);
        setAvatar(String(toBase64));
        setFile(e.target.files[0]);
      }
      
  }
  const hanldOnChange = (event: SelectChangeEvent) => {
    setRole(event.target.value)
  }
  const options:Array<{ value: number, label: string }> = [
    {value:0, label:'Role'},
    {value:1, label:'Admin'},
    {value:2, label:'User'}

  ]
  return (
    <Box component="form"  onSubmit={handleSubmitProfile}>

      <Grid sx={{width:"100%"}}>
        <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <Box >
                <Avatar 
                  onClick={handleFileUpload}
                  sx={{ width: 134, height: 134 }}
                  alt="Remy Sharp" 
                  //src="https://mui.com/static/images/avatar/1.jpg" 
                  src={`data:image/png;base64,${avatar}`}
                  />
                 <input 
                   ref={inputHref} 
                   hidden 
                   id="file" 
                   type="file" 
                   accept="image/*"  
                   onChange={handleFileChange} />
              </Box>
              <Box mt={5}>
                 <Grid container spacing={4}>
                  <Grid item sm={12} md={6}>
                    <CustomTextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                  />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <CustomSelectField 
                      label="Role"
                      options= {options}
                      onChange={hanldOnChange}
                      value= {role}
                    />
                  </Grid>
                 </Grid>
               
              </Box>
            </Grid>
            <Grid item sm={12} md={6}>

                <Box>
                 <Grid container spacing={4}>
                  <Grid item sm={12} md={6}>
                    <CustomTextField
                      margin="normal"
                      required
                      fullWidth
                      id="fullname"
                      label="Full Name"
                      name="fullname"
                      autoFocus
                  />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <CustomTextField
                      margin="normal"
                      required
                      fullWidth
                      id="phoneNumber"
                      label="Phone Number"
                      name="phone"
                      autoFocus
                    />
                  </Grid>
                 </Grid>               
              </Box>
              <Box>
                 <Grid container spacing={4}>
                  <Grid item sm={12} md={6}>
                    <CustomTextField
                      margin="normal"
                      required
                      fullWidth
                      id="city"
                      label="City"
                      name="city"
                      autoFocus
                  />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <CustomTextField
                      margin="normal"
                      required
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      autoFocus
                    />
                  </Grid>
                 </Grid>
               
              </Box>
              <Box mt={2} alignContent={"center"}>
              <Button type="submit" sx={{border:"1px solid blue", background:"black",color:"white"}}>Save Profile</Button>
              </Box>

            </Grid>
        </Grid>
      </Grid>
    </Box>

  )
}

export default MyProfile