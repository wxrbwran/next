import React from 'react';
import Head from 'next/head';
import Header from '../Header';
import './index.scss';
import './reset.scss';

function Layout({ children }) {
  return (
    <React.Fragment>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <title>Next-Antd-Scafflod</title>
        <link rel='stylesheet' href='https://cdn.bootcss.com/antd/3.16.3/antd.css'/>
      </Head>
      <Header />
      {children}
    </React.Fragment>
  )
}

export default Layout;
