import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>21BCE0790_VEDANT_SHARMA</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp