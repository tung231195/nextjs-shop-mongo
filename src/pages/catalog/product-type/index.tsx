"use client"
import { Box, Button, Grid } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DeleteButton from "src/components/button/delete-button";
import EditButton from "src/components/button/edit-button";
import CustomAlertDialog from "src/components/confirm-box";
import CustomDataTable from "src/components/data-grid"
import FallbackSpinner from "src/components/fall-back";
import CustomTextField from "src/components/text-field";
import { TPramsGetAllProductType, TPramsUpdateProductType } from "src/configs/@type/catalog/product-type";
import { AppDispatch, RootState } from "src/stores";
import { deleteProductTypeAction, getAllProductTypeAction } from "src/stores/catalog/product-type/productTypeAction";
import CreateEditTypeModal from "src/views/layouts/components/catalog/create-edit-type-modal";

const MANAGE_PRODUCT_TYPE = ()=> {

  /**state  */
  const [openModal,setOpenModal] = useState({open:false,id:""})
  const [openConfirm,setOpenConfirm] = useState(false);
  const [update, setUpdate] = useState<TPramsUpdateProductType | null>(null)
  const [search, setSearch] = useState<string>("");
  console.log('search',search)
  const dispatch = useDispatch<AppDispatch>()

  /**translation */
  const { t } = useTranslation();

  /**handEditProductType */
  const handEditProductType = ( params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    const {_id,name,slug} = params.row
    setUpdate(
      {
        _id,
        name,
        slug
      }
    );
    setOpenModal({open:true,id:_id});  
  }
  const handleCreateProductType = () => {
    console.log('create product type')
    setUpdate(null);
    setOpenModal({open:true,id:openModal.id});
  }

  const handleClose = () => {
    setOpenModal({open:false,id:""});
  }
  const handDeleteProductType=(params:any) => {
    setOpenConfirm(true);
    dispatch(deleteProductTypeAction(params._id))
  }
  const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'ProductType Name',
    width: 150,
    editable: true,
    sortable:false,
    filterable:false,

  },
  { field: 'actions', headerName: 'Actions', width: 400, renderCell: (params) => {
    return (
      <Box>
      <DeleteButton handDelete={()=>handDeleteProductType(params.row)} />
      <EditButton handleEdit={() => handEditProductType(params)} />
      </Box>
    );
    }   
  }
];

  const  getRowId =(row:any)=> {

    return row._id;
  }

  const handleRowClick = (params:any) => {
    console.log('Row clicked:', params.row);
  }

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  }

  const handleSearch = (e:any) => {
    setSearch(e.target.value);
  }
  
  // const searchDelayed = useMemo(
  //     () => debounce(handleSearch, 3000),
  //     [handleSearch]
  // );
    
  useEffect (()=> { 
    const params:TPramsGetAllProductType = {
      limit:10,
      page:1
    }
    dispatch(getAllProductTypeAction(params));
  },[])

  const allProductTypes = useSelector((state:RootState) => state.productTypeSlide.productTypes)
  const isLoading = useSelector((state:RootState) => state.productTypeSlide.loading)

  return (
    <Box sx={{height:"100%",maxWidth:"100% !important"}}>

      {isLoading && <FallbackSpinner />}
        <Box>
          <Button onClick={handleCreateProductType}>{t("create_new")}</Button>
          <CustomTextField placeholder="search..." onChange={handleSearch}/>
        </Box>
     <Grid container >
          <Grid item xs={12}>
            {allProductTypes && <CustomDataTable onRowClick={handleRowClick}   getRowId={getRowId} rows={allProductTypes} columns={columns}  />}
          </Grid>
     </Grid> 
      <CreateEditTypeModal updateData={update} open={openModal} handleClose={handleClose} />
      <CustomAlertDialog open={openConfirm} handleClose={handleCloseConfirm} />
    </Box>
  )
}

export default MANAGE_PRODUCT_TYPE