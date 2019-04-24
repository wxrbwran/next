import * as React from 'react';
import { ComponentExt } from '../../../utils/reactExt';
// import * as styles from './index.scss';

interface IProps {}

class UserDetail extends ComponentExt<IProps> {

  state = {};

  render() {
    console.log('props', this.props);
    return (
      <div>sample text</div>
    );
  }
}

export default UserDetail;
