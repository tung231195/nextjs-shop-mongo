export interface TPramsGetAllCity {
  limit: number,
  page:number,
  search?:string,
  order?:string,
}

export interface TPramsCreateCity {
  name:string
}

export interface TPramsUpdateCity {
  name:string,
  _id:string
}

export interface CityDataType {
  _id: string
  name:string
}
