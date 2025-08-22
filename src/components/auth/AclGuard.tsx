// ** React Imports
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

// ** Types
import { AppAbility, buildAbilityFor, type ACLObj } from 'src/configs/acl'
import { useAuth } from 'src/hooks/useAuth'
import Error401 from 'src/pages/401'
import BlankLayout from 'src/views/layouts/BlankLayout'

interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props
  const authContext = useAuth();
  let ability: AppAbility;
  const router = useRouter();
  console.log('check auth in acl',authContext);
  const permissionUser = authContext.user?.role?.permissions ?? []
  
  if(!ability && authContext.user) {
      ability = buildAbilityFor(permissionUser,aclAbilities.subject);
  }
  if(ability) {
    // console.log('check ability',ability)
    if(authContext.user && ability.can(aclAbilities.action,aclAbilities.subject)) {
        return children;
    }
    return <BlankLayout><Error401 /></BlankLayout>

  }
  return children;
}

export default AclGuard
