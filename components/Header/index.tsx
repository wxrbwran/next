import * as React from 'react';
import Link from 'next/link';
import { ComponentExt } from '../../utils/reactExt';
import styles from './index.scss';

interface IProps {}

class Header extends ComponentExt<IProps> {
  state = {
    title: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.title !== prevState.title) {
      return {
        title: nextProps.title,
      };
    }
    return null;
  }

  render() {
    const { title } = this.state;

    return (
      <div className={styles.header}>
        <Link href="/">
          <div className={styles.logoContainer}>
            <img className={styles.logo} src="/static/logo.png" alt="logo" />
            <span className={styles.sysName}>各种系统</span>
          </div>
        </Link>
        <h3>{title}</h3>
      </div>
    );
  }
}

export default Header;
