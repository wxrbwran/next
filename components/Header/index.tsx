import * as React from 'react';
import { ComponentExt } from '../../utils/reactExt';
import Link from 'next/link';

interface IProps {}

class Header extends ComponentExt<IProps> {

  state = {
    title: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.title !== prevState.title) {
      return {
        title: nextProps.title,
      }
    }
    return null;
  }

  render() {

    const { title } = this.state;

    return (
      <div className="header">
        <Link href={'/'}>
          <div className="logo-container">
            <img className="logo" src="/static/logo.png" alt="logo"/>
            <span className="sys-name">各种系统</span>
          </div>
        </Link>
        <h3>{ title }</h3>
        <style jsx>{`
          .header {
            height: 60px;
            margin-bottom: 10px;
          }
          h2 {
            text-align: center;
            line-height: 60px;
            font-size: 1.6rem;
            font-weight: 500;
            color: #fff;
          }
           .logo-container {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 15px;
            left: 20px;
            cursor: pointer;
          }
          .sys-name {
            display: inline-block;
            margin-left: 10px;
            font-size: 20px;
            font-weight: 600;
          }
          .logo {
            width: 30px;
            height: 30px;
          }
        `}</style>
      </div>
    );
  }
}

export default Header;
