import Head from 'next/head'

export const Header = ({ title }) =>
  <Head>
    <title>{title}</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>