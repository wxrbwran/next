import App, { Container } from 'next/app'
import React from 'react'
import * as store from '../store'
import { Provider } from 'mobx-react'

class MyMobxApp extends App {
  static async getInitialProps(appContext) {
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    // Provide the store to getInitialProps of pages
    appContext.ctx.mobxStore = store

    let appProps = await App.getInitialProps(appContext)

    return {
      ...appProps,
      initialMobxState: store
    }
  }

  constructor(props) {
    super(props)
    const isServer = !process.browser
    this.mobxStore = isServer
      ? props.initialMobxState
      : store
  }

  render() {
    const { Component, pageProps } = this.props
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
