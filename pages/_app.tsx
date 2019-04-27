import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'mobx-react';
import * as store from '../store/index';

interface IProps {
  pageProps: any;
  Component: any;
}

class MyMobxApp extends App<IProps> {
  static async getInitialProps(appContext) {
    // console.log('appContext', appContext);
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    const mobxStore = store;
    // Provide the store to getInitialProps of pages
    appContext.ctx.mobxStore = mobxStore;

    let appProps = await App.getInitialProps(appContext);
    // console.log('appProps', appProps);
    // console.log('mobxStore', mobxStore);

    return {
      ...appProps,
      initialMobxState: mobxStore,
    };
  }

  constructor(props) {
    super(props);
    const isServer = !process.browser;
    this.mobxStore = isServer
      ? props.initialMobxState
      : store;
  }

  render() {
    // console.log('app', this);
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={this.mobxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}
export default MyMobxApp
