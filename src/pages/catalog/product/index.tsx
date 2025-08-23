"use client"
import { Avatar, Badge, Box, Button, Grid, styled, Typography } from "@mui/material";
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import {  useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DeleteButton from "src/components/button/delete-button";
import EditButton from "src/components/button/edit-button";
import CustomAlertDialog from "src/components/confirm-box";
import CreateEditModal from "src/views/layouts/components/create-edit-modal";
import CustomDataTable from "src/components/data-grid"
import FallbackSpinner from "src/components/fall-back";
import CustomTextField from "src/components/text-field";
import { TPramsGetAllProduct, TPramsUpdateProduct } from "src/configs/@type/catalog/product";
import { AppDispatch, RootState } from "src/stores";
import { deleteProductAction, getAllProductAction } from "src/stores/catalog/product/productAction";

  const MANAGE_PRODUCT = ()=> {

  /**state  */
  const [openModal,setOpenModal] = useState({open:false,id:""})
  const [openConfirm,setOpenConfirm] = useState(false);
  const [update, setUpdate] = useState<TPramsUpdateProduct | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  /**translation */
  const { t } = useTranslation();

  //** default */
  // const TDefaultProduct = {
  //     "name": "",
  //     "slug": "",
  //     "image": "",
  //     "location": "",
  //     "price": 0,
  //     "countInStock": 0,
  //     "description": "",
  //     "discount": 0,
  //     "sold": 0,
  //     "type": "",
  //     "discountStartDate": null,
  //     "discountEndDate": null,
  //     "status": 0
  // }

  /**handEditProduct */
  const handEditProduct = ( params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    const { _id,name,type,price,discount,discountEndDate,discountStartDate,status,location,slug,sold,description,countInStock,image} = params.row
    {
      setUpdate(
        {
          _id,name,type,price,discount,discountEndDate,discountStartDate,status,location,slug,sold,description,countInStock,image
        }
      )
    }
    setOpenModal({open:true,id:_id});  
  }
  const handleCreateProduct = () => {
    setUpdate(null);
    setOpenModal({open:true,id:openModal.id});
  }

  const handleClose = () => {
    setOpenModal({open:false,id:""});
  }
  const handDeleteProduct=(params:any) => {
    setOpenConfirm(true);
    dispatch(deleteProductAction(params._id))
  }
  const StyledBadge = styled(Badge)(() => ({ 
        "& .MuiAvatar-img" : {
          objectFit: "container"
        }
  }));

  const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 90 },
  {
    field: 'image',
    headerName: 'Image',
    width: 250,
    editable: true,
    sortable:false,
    filterable:false,
    renderCell: (params) => {

      return (
        <>
        <StyledBadge
        >
          <Avatar 
            sx={{ width: 150, height: "100%" }}
            alt="Remy Sharp" 
            src={`data:image/png;base64,${params.row.image}`}
            />
        </StyledBadge>
        </>
      )
    }

  },
  {
    field: 'name',
    headerName: 'Product Name',
    width: 150,
    editable: true,
    sortable:false,
    filterable:false,

  },
    {
    field: 'slug',
    headerName: 'slug',
    width: 150,
    editable: true,
    sortable:false,
    filterable:false,

  },
    {
    field: 'price',
    headerName: 'Price',
    width: 150,
    editable: true,
    sortable:false,
    filterable:false,

  },
    {
    field: 'status',
    headerName: 'Product Status',
    width: 150,
    editable: true,
    sortable:false,
    filterable:false,

  },
      {
    field: 'location',
    headerName: 'Location',
    width: 150,
    editable: true,
    sortable:false,
    filterable:false,
    renderCell: (params) => {

    return (
      <Box>
      <Typography>{params.row.location.name}</Typography>
      </Box>
    );
    }   

  },
        {
    field: 'productType',
    headerName: 'Product Type',
    width: 150,
    editable: true,
    sortable:false,
    filterable:false,
    renderCell: (params) => {

    return (
      <Box>
      <Typography>{params.row.type.name}</Typography>
      </Box>
    );
    }   

  },
  { field: 'actions', headerName: 'Actions', width: 400, renderCell: (params) => {

    return (
      <Box>
      <DeleteButton handDelete={()=>handDeleteProduct(params.row)} />
      <EditButton handleEdit={() => handEditProduct(params)} />
      </Box>
    );
    }   
  }
];


  const  getRowId =(row:any)=> {

    return row._id;
  }


  const handleRowClick = (params:any) => {
    console.log(params)
  }

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  }

  const handleSearch = (e:any) => {
    console.log(e.target.value)
  }
  
  // const searchDelayed = useMemo(
  //     () => debounce(handleSearch, 3000),
  //     [handleSearch]
  // );
    
  useEffect (()=> { 
    const params:TPramsGetAllProduct = {
        limit: 10,
        page:1,
        search:"",
        order:"",
        productType:"",
        productLocation:"",
        status:1,
        minPrice: 0,
        maxPrice: 0,
        minStart:0,
        maxStar:0
    }
    dispatch(getAllProductAction(params));
  },[])
  const allProducts = useSelector((state:RootState) => state.productSlide.products)
  const isLoading = useSelector((state:RootState) => state.productSlide.loading)

  return (
    <Box sx={{height:"100%",maxWidth:"100% !important"}}>
      {isLoading && <FallbackSpinner />}
        <Box>
          <Button onClick={handleCreateProduct}>{t("create_new")}</Button>
          <CustomTextField placeholder="search..." onChange={handleSearch}/>
        </Box>
     <Grid container >
          <Grid item xs={12}>
            {allProducts && <CustomDataTable onRowClick={handleRowClick}   getRowId={getRowId} rows={allProducts} columns={columns}  />}
          </Grid>
     </Grid> 
      <CreateEditModal updateData={update} open={openModal} handleClose={handleClose} />
      <CustomAlertDialog open={openConfirm} handleClose={handleCloseConfirm} />
    </Box>
  )
}

export default MANAGE_PRODUCT