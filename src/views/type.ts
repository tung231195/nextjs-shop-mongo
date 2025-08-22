export interface TPramsLogin {
  email: string,
  password:string
}

export interface TPramsCreateRole {
  name:string
}

export interface TPramsGetAllRoles {
  limit: number
  page: number
  search?: string
  order?:string
}

export interface TTypeRole{
  id:string,
  name:string
}

export interface TPramsUpdateRole {
  id:string,
  name:string,
  permissions: string []
}