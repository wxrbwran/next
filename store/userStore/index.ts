import { observable, action } from 'mobx';

import { StoreExt } from '@utils/reactExt';

export class UserStore extends StoreExt {
  /**
   * 加载用户列表时的loading
   *
   * @type {boolean}
   * @memberof UserStore
   */
  @observable
  user: any = {};

  /**
   * 加载用户列表
   *
   * @memberof UserStore
   */
  @action
  getUsers = async () => {}
}

export default new UserStore();
