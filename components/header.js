import React from 'react'
import Head from 'next/head'

export const Header = ({ title }) =>
  <Head>
    <title>{title}</title>
    <link rel="icon" href="/favicon.ico" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
  </Head>
