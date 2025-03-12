import { useQuery } from 'react-query'
import { getCards } from '@remote/card'

export default function useCards() {
  return useQuery(['home-cards'], () => getCards(), {
    suspense: true,
  })
}
