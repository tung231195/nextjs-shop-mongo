"use client";
import { Box, Button, Grid } from "@mui/material";
import {
  GridColDef
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CustomDataTable from "src/components/data-grid";
import CustomModal from "src/components/modal";
import { AppDispatch, RootState } from "src/stores";
import {
  deleteRoleAction,
  getAllRoleByIdAction,
  getRoleAction,
  updateRoleAction,
} from "src/stores/apps/role/roleAction";
import PermissionTable from "src/views/layouts/components/roles/PermissionTable";
import RoleCreate from "src/views/layouts/components/roles/RoleCreate";
import { TPramsGetAllRoles, TPramsUpdateRole } from "src/views/type";

const MANAGE_USER = () => {

  /**state */
  const [open, setOpen] = useState<boolean>(false);
  const [checkedPermission, setCheckedPermisson] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  /** handleCreateRole */
  const handleCreateRole = () => {
    setIsEdit(false);
    setOpen(true);
  };

  /**handEditRole */
  const handEditRole = (

    // e: MouseEvent<HTMLButtonElement, MouseEvent>,
    // params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
  ) => {
    setIsEdit(true);
    setOpen(true);
  };
  const {t} = useTranslation();
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
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
              onClick={(e) => handEditRole(e, params.row)}
              variant="contained"
            >
              Edit
            </Button>
          </Box>
        );
      },
    },
  ];

  const dispatch = useDispatch<AppDispatch>();

  const handDeleteRole = (e: any, params: any) => {
    dispatch(deleteRoleAction(params._id));
  };
  const getRowId = (row: any) => {

    return row._id;
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  const handleRowClick = (params: any) => {
    // params contains information about the clicked row, e.g., params.row.id, params.row
    console.log("Row clicked:", params.row);
    const { _id } = params.row;
    dispatch(getAllRoleByIdAction(_id));
  };

  const selectedRole = useSelector(
    (state: RootState) => state.roleSlide.selectedRole
  );

  const handleUpdateRole = () => {
    const { id, name } = selectedRole;
    
    const params: TPramsUpdateRole = {
      id: id,
      name: name,
      permissions: checkedPermission,
    };
    dispatch(updateRoleAction(params));
  };
  useEffect(() => {
    const params: TPramsGetAllRoles = {
      limit: -1,
      page: 1,
      search: "",
      order: "create asc",
    };
    dispatch(getRoleAction(params));
  }, []);
  const allroles = useSelector((state: RootState) => state.roleSlide.roles);

  return (
    <Box sx={{ height: "100%", maxWidth: "100% !important" }}>
      <Button onClick={handleCreateRole}>{t("create_role")}</Button>
      <Grid container>
        <Grid item xs={5}>
          {allroles && (
            <CustomDataTable
              onRowClick={handleRowClick}
              getRowId={getRowId}
              rows={allroles}
              columns={columns}
            />
          )}
        </Grid>
        <Grid item xs={7}>
          <Button onClick={handleUpdateRole}>{t("update_role")}</Button>
          <PermissionTable
            checkedPermission={checkedPermission}
            setCheckedPermisson={setCheckedPermisson}
          />
        </Grid>
      </Grid>
      <CustomModal onClose={handleClose} open={open}>
        <Box>
          <RoleCreate isEdit={isEdit} />
        </Box>
      </CustomModal>
    </Box>
  );
};

export default MANAGE_USER;
