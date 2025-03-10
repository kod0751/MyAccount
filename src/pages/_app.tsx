import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'

import globalStyles from '@/styles/globalStyles'
import Layout from '@components/shared/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </Layout>
  )
}
