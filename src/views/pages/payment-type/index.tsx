
import { Box, Button, Grid } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { TPropsPaymentType } from "src/pages/payment-type"
import { AppDispatch, RootState } from "src/stores"
import CustomDataTable from "src/components/data-grid"
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid"
import DeleteButton from "src/components/button/delete-button"
import EditButton from "src/components/button/edit-button"
import { useEffect, useState } from "react"
import { TPramsGetAllPaymentType, TPramsUpdatePaymentType } from "src/configs/@type/payment-type"
import CustomTextField from "src/components/text-field"
import { useTranslation } from "react-i18next"
import CreateEditPaymentType from "src/views/layouts/components/payment-type"
import { deletePaymentTypeAction, getAllPaymentTypeAction } from "src/stores/payment-type/paymentTypeAction"
import { deletePaymentType, getAllPaymentTypes } from "src/service/payment-type"
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import FallbackSpinner from "src/components/fall-back"
const PaymentTypePage = (props:TPropsPaymentType)=> {

   // const allPaymentTypes = useSelector((state:RootState) => state.paymentSlide.payments)
    /**state  */
    const [openModal,setOpenModal] = useState({open:false,id:""})
    const [openConfirm,setOpenConfirm] = useState(false);
    const [update, setUpdate] = useState<TPramsUpdatePaymentType | null>(null)
    const [sortBy,setSortBy] = useState("")
    const [orderBy,setOrderBy] = useState("")
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

      const handEditCity = ( params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
        setUpdate({name:params.row.name,type:params.row.type,_id:params.row._id});
        setOpenModal({open:true,id:params.row._id});
      }
      const handleCreateItem = () => {
        console.log('create payment')
        setUpdate(null);
        setOpenModal({open:true,id:openModal.id});
      }
    
      const handleClose = () => {
        setOpenModal({open:false,id:""});
      }
      const removePaymentType = (_id:string) => {
        return deletePaymentType(_id)
      }

      const handleSortBy = () => {
          //setSortBy('')
      }
      const handleOrderBy = (order:string) => {
          setOrderBy(`name ${order}`);
      }

      // Mutations
      const queryClient = useQueryClient();
      const mutationDelete = useMutation({
        mutationFn: removePaymentType,
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['fetch_all_payment'] })
        },
      })
      const handDeleteItem=(params:any) => {
        setOpenConfirm(true);
        mutationDelete.mutate(params._id)
       //dispatch(deletePaymentTypeAction(params._id))
      }
      let params:TPramsGetAllPaymentType = {
          limit:10,
          page:1,
          order: orderBy
      }

    //** react query */
      const fetchAllPayment = async () => {
        let res=  await getAllPaymentTypes(params);
        return res?.data.paymentTypes
      } 
      const { isPending, error, data:allPaymentTypes } = useQuery({
        queryKey: ['fetch_all_payment',orderBy],
        queryFn: fetchAllPayment,
        //refetchInterval:1000
      })

      useEffect (() => {
        fetchAllPayment()
      },[orderBy])
      console.log('check data',isPending, error, allPaymentTypes)


    //use effect 
      useEffect (()=> { 
       // dispatch(getAllPaymentTypeAction(params));
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
       field: 'type',
       headerName: 'Type',
       width: 150,
       editable: true,
       sortable:false,
       filterable:false,
   
     },
     { field: 'actions', headerName: 'Actions', width: 400, renderCell: (params) => {
       return (
         <Box>
         <DeleteButton handDelete={()=>handDeleteItem(params.row)} />
         <EditButton handleEdit={() => handEditCity(params)} />
         </Box>
       );
       }   
     }
   ];
   //translate
   const {t} = useTranslation()   
  return (
    <>  
          {isPending && <FallbackSpinner/>}
          <Box>
            <Button onClick={handleCreateItem}>{t("create_new")}</Button>
            <Button onClick={handleSortBy}>{t("Sort By")}</Button>
            <Button onClick={() =>handleOrderBy('desc')}>{t("Order By DESC")}</Button>
            <Button onClick={() => handleOrderBy('asc')}>{t("Order By ASC")}</Button>
          </Box>
         <Grid container >
              <Grid item xs={12}>
                {allPaymentTypes && <CustomDataTable onRowClick={handleRowClick}   getRowId={getRowId} rows={allPaymentTypes} columns={columns}  />}
              </Grid>
         </Grid> 
          <CreateEditPaymentType updateData={update} open={openModal} handleClose={handleClose} />
    </>
  )
}

export default PaymentTypePage