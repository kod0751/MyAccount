import { dehydrate, QueryClient } from 'react-query'

import { getCards } from '@/remote/card'

export default function CardListPage() {
  return <div>CardListPage</div>
}

export async function getServerSideProps() {
  console.log('getServerSideProps')

  const client = new QueryClient()

  await client.prefetchInfiniteQuery(['cards', () => getCards()])

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
    },
  }
}
