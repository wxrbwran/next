import http from '../http';

export default {
  // 登录
  login(data): Promise<any> {
    return http.post('auth/login', data || {});
  },
};
