// ** React Imports
import { useRouter } from 'next/router'
import { ReactNode, ReactElement, useEffect } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import authConfig from 'src/configs/auth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

  const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const router = useRouter();
  const authContext = useAuth();
  console.log(fallback)
  useEffect(()=> {
    if(!authContext.user && !window.localStorage.getItem(authConfig.onTokenExpiration)) {
      if(router.pathname!= '/') {
        router.replace('/login')
      }
    } else {

     // router.replace(router.asPath)

    }
  },[router.asPath])
  
   //return fallback;

  return <>{children}</>
}

export default AuthGuard
