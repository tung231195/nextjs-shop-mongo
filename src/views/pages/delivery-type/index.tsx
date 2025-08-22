
import { Box, Button, Grid } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { TPropsDeliveryType } from "src/pages/delivery-type"
import { AppDispatch, RootState } from "src/stores"
import CustomDataTable from "src/components/data-grid"
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid"
import DeleteButton from "src/components/button/delete-button"
import EditButton from "src/components/button/edit-button"
import { useEffect, useState } from "react"
import { TPramsGetAllDeliveryType, TPramsUpdateDeliveryType } from "src/configs/@type/delivery-type"
import { useTranslation } from "react-i18next"
import CreateEditDeliveryType from "src/views/layouts/components/delivery-type"
import { deleteDeliveryTypeAction, getAllDeliveryTypeAction } from "src/stores/delivery-type/deliveryTypeAction"
const DeliveryTypePage = (props:TPropsDeliveryType)=> {

 const allDeliveryTypes = useSelector((state:RootState) => state.deliverySlide.deliveries)
    /**state  */
    const [openModal,setOpenModal] = useState({open:false,id:""})
    const [openConfirm,setOpenConfirm] = useState(false);
    const [update, setUpdate] = useState<TPramsUpdateDeliveryType | null>(null)

    //** dispatch */
    const dispatch = useDispatch<AppDispatch>();
   //handle 

      const  getRowId =(row:any)=> {
        console.log('get row',row);
        return row._id;
      }
    
  
      const handleRowClick = (params:any) => {
        console.log('Row clicked:', params.row);
        const {_id} = params.row; 
    
      }

      const handleEditItem = ( params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
        setUpdate({name:params.row.name,type:params.row.type,_id:params.row._id});
        setOpenModal({open:true,id:params.row._id});
      }
      const handleCreateItem = () => {
        console.log('create delivery')
        setUpdate(null);
        setOpenModal({open:true,id:openModal.id});
      }
    
      const handleClose = () => {
        setOpenModal({open:false,id:""});
      }
      const handDeleteItem=(params:any) => {
        setOpenConfirm(true);
       dispatch(deleteDeliveryTypeAction(params._id))
      }
      let params:TPramsGetAllDeliveryType = {
          limit:10,
          page:1
      }
    //use effect 
      useEffect (()=> { 
        dispatch(getAllDeliveryTypeAction(params));
      },[])
   // datab table 
     const columns: GridColDef[] = [
     { field: '_id', headerName: 'ID', width: 90 },
     {
       field: 'name',
       headerName: 'Name',
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
     { field: 'actions', headerName: 'Actions', width: 400, renderCell: (params) => {
       return (
         <Box>
         <DeleteButton handDelete={()=>handDeleteItem(params.row)} />
         <EditButton handleEdit={() => handleEditItem(params)} />
         </Box>
       );
       }   
     }
   ];
   //translate
   const {t} = useTranslation()   
  return (
    <>
          <Box>
            <Button onClick={handleCreateItem}>{t("create_new")}</Button>
          </Box>
         <Grid container >
              <Grid item xs={12}>
                {allDeliveryTypes && <CustomDataTable onRowClick={handleRowClick}   getRowId={getRowId} rows={allDeliveryTypes} columns={columns}  />}
              </Grid>
         </Grid> 
          <CreateEditDeliveryType updateData={update} open={openModal} handleClose={handleClose} />
    </>
  )
}

export default DeliveryTypePage