export interface TPramsGetAllProduct {
  limit: number,
  page:number,
  search?:string,
  order?:string,
  productType?:string,
  productLocation?:string,
  status:number,
  minPrice: number,
  maxPrice: number,
  minStart:number,
  maxStar:number
}

export interface TPramsCreateProduct {
  name: string,
  slug: string,
  image: string,
  location: string,
  price: number,
  countInStock: number,
  description: string,
  discount: number,
  sold: number,
  type: string,
  discountStartDate: Date,
  discountEndDate: Date,
  status: number
}

export interface TPramsUpdateProduct {
  _id:number
  name: string,
  slug: string,
  image: string,
  location: string,
  price: number,
  countInStock: number,
  description: string,
  discount: number,
  sold: number,
  type: string,
  discountStartDate: Date,
  discountEndDate: Date,
  status: number
}

export interface ProductDataType {
  name: string,
  slug: string,
  image: string,
  location: string,
  price: number,
  countInStock: number,
  description: string,
  discount: number,
  sold: number,
  type: string,
  discountStartDate: Date,
  discountEndDate: Date,
  status: number
}

