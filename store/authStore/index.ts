import { observable, action, runInAction } from 'mobx';

import { StoreExt } from '../../utils/reactExt';
import { routerStore } from './../';

export class AuthStore extends StoreExt {
  /**
   * 用户信息
   *
   * @type {IAuthStore.UserInfo}
   * @memberof AuthStore
   */
  @observable
  userInfo: IAuthStore.UserInfo = null;

  @action
  login = async (params: IAuthStore.LoginParams): Promise<any> => {
    try {
      const res = await this.api.auth.login(params);
      console.log(res);
      runInAction('SET_USERINFO', () => {
        this.userInfo = res;
      });
      routerStore.replace('/');
    } catch (err) {
      console.error(err);
      routerStore.replace('/');
    }
  }

  @action
  logout = () => {
    routerStore.replace('/login');
  }

  /**
   * 初始化用户信息
   *
   * @memberof AuthStore
   */
  @action
  initUserInfo = (): IAuthStore.UserInfo => {
  }
}

export default new AuthStore();
