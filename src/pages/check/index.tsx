import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/stores";
import { getRoleAction } from "src/stores/apps/role/roleAction";
import { TPramsGetAllRoles } from "src/views/type";

const check = () => {
  const roles = useSelector((state:RootState) => state.roleSlide.roles)
  const dispatch = useDispatch();
  useEffect(()=> {
    console.log('runt to aaaaaaaaaa');
          let params:TPramsGetAllRoles = {limit:-1,page:1,search:'',order:'create asc'};
          dispatch(getRoleAction(params))
  },[])

  return (
    <>
    check effect
    {roles && roles.map((role)=> {
      return (
        <Typography>{role.name}</Typography>
      )
    })}
    </>
  )
}

export default check; 