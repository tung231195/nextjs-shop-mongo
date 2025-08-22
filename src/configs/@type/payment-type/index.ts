export interface TPramsGetAllPaymentType {
  limit: number
  page:number
  search?:string
  order?:string
}

export interface TPramsCreatePaymentType {
  name:string
  type:string
}

export interface TPramsUpdatePaymentType {
  name:string
  type:string
  _id:string
}

export interface PaymentTypeDataType {
  _id: string
  name:string
  type:string
}
