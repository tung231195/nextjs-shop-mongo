export interface TPramsGetAllUser {
  limit: number,
  page:number,
  search?:string,
  order?:string,
  roleId?:string,
  status?:string,
  cityId?:string
}


export interface TParamsUserDataType {
  id: number
  role: {name:string, permissions:string[]}
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
  
}
