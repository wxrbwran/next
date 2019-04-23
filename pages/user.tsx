import React from 'react';
import { ComponentExt } from '../utils/reactExt'
import Layout from '../components/Layout';

interface IProps {
  userAgent: string;
}

class App extends ComponentExt<IProps>{

  static async getInitialProps(props) {
    const { req } = props;
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    return { userAgent };
  }

  render () {
    return (
      <Layout>
        <h1>我是用户页面</h1>
        <h3>{ this.props.userAgent }</h3>
      </Layout>
    );
  }
}

export default App;
