"use client";
import { Box, Button, Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CustomDataTable from "src/components/data-grid";
import CustomModal from "src/components/modal";
import { TPramsGetAllUser } from "src/configs/@type/users";
import { AppDispatch, RootState } from "src/stores";
import { getAllUserAction } from "src/stores/user/userAction";

const MANAGE_USER = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  /**handEditUser */
  const handEditUser = (e: any, params: any) => { return {e,params}};
  const handleCreateUser = () => {};

  const handleClose = () => { setOpen(false)};
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "fullname",
      headerName: "Full Name",
      width: 150,
      editable: true,
      sortable: false,
      filterable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
      sortable: false,
      filterable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => {

        return (
          <Box>
            <Button
              onClick={(e) => handDeleteRole(e, params.row)}
              variant="contained"
            >
              Delete
            </Button>
            <Button
              onClick={(e) => handEditUser(e, params.row)}
              variant="contained"
            >
              Edit
            </Button>
          </Box>
        );
      },
    },
  ];

  const handDeleteRole = (e: any, params: any) => { return {e,params} };
  const getRowId = (row: any) => {

    return row._id;
  };

  const handleRowClick = (params: any) => {

    // params contains information about the clicked row, e.g., params.row.id, params.row
    const { _id } = params.row;

    return _id;
  };

  // const selectedRole = useSelector(
  //   (state: RootState) => state.roleSlide.selectedRole
  // );

  // const handleUpdateRole = () => {};
  useEffect(() => {
    const params: TPramsGetAllUser = {
      limit: 10,
      page: 1,
      order: "created asc",
    };
    dispatch(getAllUserAction(params));
  }, []);
  const allUsers = useSelector((state: RootState) => state.userSlide.users);
  
  return (
    <Box sx={{ height: "100%", maxWidth: "100% !important" }}>
      <Button onClick={handleCreateUser}>{t("create_role")}</Button>
      <Grid container>
        <Grid item xs={12}>
          {allUsers && (
            <CustomDataTable
              onRowClick={handleRowClick}
              getRowId={getRowId}
              rows={allUsers}
              columns={columns}
            />
          )}
        </Grid>
      </Grid>
      <CustomModal onClose={handleClose} open={open}>
        <Box></Box>
      </CustomModal>
    </Box>
  );
};

export default MANAGE_USER;
