import React from 'react';
import { ComponentExt } from '../utils/reactExt'
import Layout from '../components/Layout';

interface IProps {
  userAgent: string;
}

const sleep = (time) => new Promise(resolve => {
  setTimeout(() => {
    resolve();
  }, time);
});


class App extends ComponentExt<IProps>{

  static async getInitialProps(props) {
    const { req } = props;
    await sleep(800);
    const userAgent = req ? req.headers['user-agent'] : '===';
    return { userAgent };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('nextProps', nextProps);
    console.log('prevState', prevState);
    if (nextProps.userAgent !== prevState.userAgent) {
      return { userAgent: nextProps.userAgent }
    }
    return null;
  }

  state = {
    userAgent: '!!!',
  }

  render () {
    return (
      <Layout>
        <h1>我是用户页面</h1>
        <h3>{ this.state.userAgent }</h3>
      </Layout>
    );
  }
}

export default App;
