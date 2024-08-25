import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>21BCE0791_VEDANG_PAITHANKAR</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp