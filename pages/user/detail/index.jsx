import * as React from 'react';
import { ComponentExt } from '../../../utils/reactExt';
// import * as styles from './index.scss';

class UserDetail extends ComponentExt {

  state = {};

  render() {
    console.log('props', this.props);
    return (
      <div>sample text</div>
    );
  }
}

export default UserDetail;
