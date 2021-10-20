import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta httpEquiv='content-type' content='text/html; charset=utf-8' />
      <link rel='icon' type='image/x-icon' href='/favicon.ico' />
      <title>Profile Terminal</title>
    </Head>
    <Component {...pageProps} />
  </>
}
export default MyApp
