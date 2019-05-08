import React from 'react';
import Link from 'next/link';
import { ComponentExt } from '@utils/reactExt';
import Layout from '../../components/Layout';

interface IProps {
  userAgent: string;
}

const sleep = time => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, time);
});


class App extends ComponentExt<IProps> {
  static async getInitialProps() {
    await sleep(800);
    return { userAgent: '===' };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('nextProps', nextProps);
    console.log('prevState', prevState);
    if (nextProps.userAgent !== prevState.userAgent) {
      return { userAgent: nextProps.userAgent };
    }
    return null;
  }

  state = {
    userAgent: '!!!',
  }

  render() {
    return (
      <Layout>
        <h1>我是用户页面</h1>
        <h3>{ this.state.userAgent }</h3>
        <Link href='/user/list'><a href='/user/list'>用户列表</a></Link>
      </Layout>
    );
  }
}

export default App;
