import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'

import globalStyles from '@styles/globalStyles'
import Layout from '@shared/Layout'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'

const client = new QueryClient({})

export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <Hydrate state={dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
