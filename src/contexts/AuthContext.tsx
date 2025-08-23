// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axiosInstance from 'src/helpers/axious'

// ** Config
import authConfig from 'src/configs/auth'

import CONFIG_API from 'src/configs/api'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { removeStoreData, setUserStoreData } from 'src/helpers/storage'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      console.log('check storken',authConfig,storedToken)
      if (storedToken) {
        setLoading(true)
        await axiosInstance
          .get(CONFIG_API.AUTH.MePoint, {
            headers: {
              //Authorization: storedToken
              'Authorization': 'Bearer ' + storedToken 
            }
          })
          .then(async response => {
            console.log('me poi',response)
            setLoading(false)
            setUser({ ...response.data })
          })
          .catch(() => {
            removeStoreData()
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {

    axiosInstance
      .post(CONFIG_API.AUTH.INDEX, params)
      .then(async response => {
        params.rememberMe
          ? setUserStoreData(response.data.user,response.data.access_token,response.data.refresh_token)
          : null
        const returnUrl = router.query.returnUrl
        console.log('check response daata',response)
        setUser({ ...response.data.user })
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    removeStoreData();
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
