export interface TPramsGetAllProductType {
  limit: number,
  page:number,
  search?:string,
  order?:string,
}

export interface TPramsCreateProductType {
  name:string,
  slug:string
}

export interface TPramsUpdateProductType {
  _id:number
  name:string,
  slug:string
}

export interface ProductTypeDataType {
  name:string
  slug:string,
  _id:string
}
