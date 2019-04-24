import * as React from 'react';
import App, { Container } from 'next/app';

// import * as styles from './index.scss';

interface IProps {
  Component: React.ReactElement;
  pageProps: any;
}

class NewApp extends App<IProps> {

  render() {
    const {Component, pageProps} = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default NewApp;
