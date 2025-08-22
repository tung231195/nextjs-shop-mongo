import { GridColDef } from "@mui/x-data-grid"

export interface TPramsGetAllDeliveryType {
  limit: number
  page:number
  search?:string
  order?:string
}

export interface TPramsCreateDeliveryType {
  name:string
  price:number
}

export interface TPramsUpdateDeliveryType {
  name:string
  price:number
  _id:string
}

export interface DeliveryTypeDataType {
  _id: string
  name:string
  price:number
}
