import React, { useState } from 'react';
import { Button } from 'antd';
import Home from '../components/home';
import Layout from '../components/Layout';
import Link from 'next/link';

function App() {
  const [show, setShow] = useState(false);
  return (
    <Layout>
      <h1>我是首页</h1>
      <Button type="primary" onClick={() => setShow(!show)}>
        点击
      </Button>
      <Home title={'111'} show={show} />
      <Link href="/user"><a>用户</a></Link>
    </Layout>
  );
}

export default App;
