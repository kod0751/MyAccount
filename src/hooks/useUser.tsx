import { useSession } from 'next-auth/react'

import { User } from '@models/user'

export default function useUser() {
  const { data } = useSession()

  return data == null ? null : (data.user as User)
}
