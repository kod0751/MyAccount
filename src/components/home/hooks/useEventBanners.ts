import { useQuery } from 'react-query'

import { getEventBanners } from '@/remote/banner'

export default function useEventBanners() {
  //TODO: user의 계좌 보유 상황
  return useQuery(
    ['event-banners'],
    () => getEventBanners({ hasAccount: false }),
    {
      suspense: true,
    },
  )
}
