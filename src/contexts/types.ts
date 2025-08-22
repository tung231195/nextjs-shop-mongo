export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export interface AddressType {
      phoneNumber: number,
      firstName: string,
      lastName: string,
      middleName: string,
      isDefault: boolean,
      _id:string
}

export type UserDataType = {
  _id: number
  role: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null,
  addresses: AddressType[],
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}
