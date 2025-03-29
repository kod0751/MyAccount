import { useInfiniteQuery } from 'react-query'

import { getTransactions } from '@remote/transaction'
import useUser from '@hooks/useUser'

export default function useTransactions({
  suspense,
}: { suspense?: boolean } = {}) {
  const user = useUser()

  return useInfiniteQuery(
    ['transactions', user?.id],
    ({ pageParam }) =>
      getTransactions({ userId: user?.id as string, pageParam }),
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
      suspense,
    },
  )
}
