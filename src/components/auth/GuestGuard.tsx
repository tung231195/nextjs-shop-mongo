// ** React Imports
import { useRouter } from 'next/router'
import { ReactNode, ReactElement, useEffect } from 'react'
import { useAuth } from 'src/hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}
  const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const authContext = useAuth();
  const router = useRouter(); 
  console.log(fallback)
  useEffect(() => {
    //console.log(' run to effect',authContext.user)
      if(authContext.user || window.localStorage.getItem('accessToken')) {
        router.replace('/');
      }
  },[])
  
  return <>{children}</>
}

export default GuestGuard
