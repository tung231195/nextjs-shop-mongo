import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/stores";
import { getRoleAction } from "src/stores/apps/role/roleAction";
import { TPramsGetAllRoles } from "src/views/type";

const Check = () => {
  const roles = useSelector((state:RootState) => state.roleSlide.roles)
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=> {
          const params:TPramsGetAllRoles = {limit:-1,page:1,search:'',order:'create asc'};
          dispatch(getRoleAction(params))
  },[])

  return (
    <>
    {roles && roles.map((role)=> {

      return (
        <Typography key={role.id}>{role.name}</Typography>
      )
    })}
    </>
  )
}

export default Check; 