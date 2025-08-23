import { Checkbox } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { LIST_DATA_PERMISION, PERMISSIONS } from "src/configs/permission";
import CustomDataTable from "src/components/data-grid"

const PermissionTable = (props:any) => {
  const {checkedPermission,setCheckedPermisson} = props

  //const [isChecked, setIsChecked] = useState(false);
  /**state */
  const [allPermission, setAllPermission] = useState<any>([])

  // const [checkedPermission,setCheckedPermisson] = useState<string[]>([""])
  //const[open,setOpen] = useState<boolean>(false);

  /** transaltion */
  //const { i18n, t } = useTranslation();

  /** handleCreateRole */
  
  const  getValuePermission = (parentValue:string,value:string,mode:string) => {

    return parentValue ? PERMISSIONS[parentValue][value][mode] : PERMISSIONS[value];
  }
  const getAllObjectValue = (obj:any) => {
    const values:any[] = [];
    if(typeof(obj) === 'object') {
      console.log('is all obj',obj);
        for(const key in obj) {
           if(typeof(obj[key]) === 'object') {
            values.push(...getAllObjectValue(obj[key]))
           }  else {
            values.push(obj[key])
          }
        }
    }

    return values; 
  }
    const getPermissions = (value:string,parentValue?:string) => {
    
    if(parentValue) {

     return  getAllObjectValue(PERMISSIONS[parentValue][value]);
    } else {

     return getAllObjectValue(PERMISSIONS[value]);
    }

  }

  const  hanldeOnchangeAll = (params:any) => {
      const {value,isParent,parentValue} = params
      if(isParent) {

        //const pSelected = getPermissions(value)
      } else {
        const pSelected = getPermissions(value,parentValue)
        console.log('fileraaa',checkedPermission,pSelected)
        const isSelectedAll = pSelected.every((item) => checkedPermission.includes(item))
        if(isSelectedAll) {

          //const filter = checkedPermission.filter((per:any) => per!== pSelected.includes(per))
           
         // setAllPermission(filter)
        } else {

          //setAllPermission([...allPermission,...pSelected])
        }
      }
  }

  /** hook react */
  useEffect (() => {
      setAllPermission(LIST_DATA_PERMISION);
  },[])
  const columns: GridColDef[] = [
  { field: 'checkall', headerName: 'Check all', width: 80, renderCell: (params) => {

    return (
      <Checkbox  value={params.row.value} onChange={()=>hanldeOnchangeAll(params.row)} />
    );
    }   
  },  
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
    sortable:false,
    filterable:false
  },
  { field: 'create', headerName: 'Create', width: 80, renderCell: (params) => {
    const {row} = params.row;

   // const isChecked = handleChecked(row.value);
    return (
      <>
      {row && !row?.isParent && 
        <Checkbox  checked={true} onClick={hanldeClickPermission} value={getValuePermission(row.parentValue,row.value,'CREATE')} />
      }
      </>
    );
    }   
  },
    { field: 'update', headerName: 'Update', width: 80, renderCell: (params) => {

   return (
      <>
      {params.row && !params.row?.isParent && 
        <Checkbox  onClick={hanldeClickPermission} value={getValuePermission(params.row.parentValue,params.row.value,'UPDATE')}  />
      }
      </>
    );
    }   
  },
  { field: 'delete', headerName: 'Delete', width: 80, renderCell: (params) => {
    
    return (
      <>
      {params.row && !params.row?.isParent && 
        <Checkbox   onClick={hanldeClickPermission} value={getValuePermission(params.row.parentValue,params.row.value,'DELETE')}  />
      }
      </>
    );
    }   
  }
];
const  hanldeClickPermission = (e:any) => {
  if(checkedPermission.includes(e.target.value)) {
    const newItem = checkedPermission.filter((item:any) => item != e.target.value);
    setCheckedPermisson(newItem);
  } else {
    setCheckedPermisson([...checkedPermission, e.target.value]);
  }
}
const  getRowId =(row:any)=> {

    return row.id;
  }

  return (
    <>
      {allPermission && 
      <CustomDataTable   
        getRowId={getRowId} 
        rows={allPermission} 
        columns={columns}  
        getRowClassName={(params) => params.row.isParent ? 'parent' : 'child'
        }
        />}
    </>
  )
}

export default PermissionTable;