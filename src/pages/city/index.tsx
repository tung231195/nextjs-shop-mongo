"use client";
import { Box, Button, Grid } from "@mui/material";
import {
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DeleteButton from "src/components/button/delete-button";
import EditButton from "src/components/button/edit-button";
import CustomAlertDialog from "src/components/confirm-box";
import CustomDataTable from "src/components/data-grid";
import FallbackSpinner from "src/components/fall-back";
import CustomTextField from "src/components/text-field";
import { TPramsGetAllCity, TPramsUpdateCity } from "src/configs/@type/city";
import { AppDispatch, RootState } from "src/stores";
import { deleteCityAction, getAllCityAction } from "src/stores/city/cityAction";
import CreateEditCity from "src/views/layouts/components/city/create-edit-modal";

const MANAGE_City = () => {

  /**state  */
  const [openModal, setOpenModal] = useState({ open: false, id: "" });
  const [openConfirm, setOpenConfirm] = useState(false);
  const [update, setUpdate] = useState<TPramsUpdateCity | null>(null);

  //const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  /**translation */
  const { t } = useTranslation();

  /**handEditCity */
  const handEditCity = (
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
  ) => {
    setUpdate({ name: params.row.name, _id: params.row._id });
    setOpenModal({ open: true, id: params.row._id });
  };
  const handleCreateCity = () => {
    console.log("create city");
    setUpdate(null);
    setOpenModal({ open: true, id: openModal.id });
  };

  const handleClose = () => {
    setOpenModal({ open: false, id: "" });
  };
  const handDeleteCity = (params: any) => {
    setOpenConfirm(true);
    dispatch(deleteCityAction(params._id));
  };
  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "City Name",
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
            <DeleteButton handDelete={() => handDeleteCity(params.row)} />
            <EditButton handleEdit={() => handEditCity(params)} />
          </Box>
        );
      },
    },
  ];

  const getRowId = (row: any) => {

    return row._id;
  };

  const handleRowClick = (params: any) => {
    const { _id } = params.row;

    return _id
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleSearch = (e: any) => {
    console.log(e.target.value);

    //setSearch(e.target.value);
  };

  // const searchDelayed = useMemo(
  //   () => debounce(handleSearch, 3000),
  //   [handleSearch]
  // );

  useEffect(() => {
    const params: TPramsGetAllCity = {
      limit: 10,
      page: 1,
    };
    dispatch(getAllCityAction(params));
  }, []);
  const allCitys = useSelector((state: RootState) => state.citySlide.cities);
  const isLoading = useSelector((state: RootState) => state.citySlide.loading);

  return (
    <Box sx={{ height: "100%", maxWidth: "100% !important" }}>
      {isLoading && <FallbackSpinner />}
      <Box>
        <Button onClick={handleCreateCity}>{t("create_new")}</Button>
        <CustomTextField placeholder="search..." onChange={handleSearch} />
      </Box>

      <Grid container>
        <Grid item xs={12}>
          {allCitys && (
            <CustomDataTable
              onRowClick={handleRowClick}
              getRowId={getRowId}
              rows={allCitys}
              columns={columns}
            />
          )}
        </Grid>
      </Grid>
      <CreateEditCity
        updateData={update}
        open={openModal}
        handleClose={handleClose}
      />
      <CustomAlertDialog open={openConfirm} handleClose={handleCloseConfirm} />
    </Box>
  );
};

export default MANAGE_City;
