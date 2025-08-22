import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, DataGridProps, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { styled } from '@mui/material';



const TStyleDataGrid = styled(DataGrid<DataGridProps>)((theme)=>{
    return {
      "& .MuiDataGrid-row.parent": {
        background:"#ccc"
      },
      "& .MuiDataGrid-row.child": {
        background:"#fff"
      }
    }
})

export default function DataGridDemo(props:DataGridProps) {
  const {rows,columns,getRowId,onRowClick,getRowClassName} = props
  return (
    <Box sx={{ height: "100vh", width: '100%' }}>
      <TStyleDataGrid
      disableColumnFilter={true}
      onRowClick={onRowClick}
        getRowId={getRowId}
        getRowClassName={getRowClassName}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}