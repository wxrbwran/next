import * as React from 'react';
import Link from 'next/link';
import { ComponentExt } from '../../../utils/reactExt';

interface IProps {}

class UserList extends ComponentExt<IProps> {
  state = {};

  render() {
    console.log('props', this.props);
    return (
      <div>
        <Link href='/user/detail?uid=1' as='/user/detail/1'><a>用户详情</a></Link>
      </div>
    );
  }
}

export default UserList;
