import http from '../http';

export default {
  // 登录
  login(data) {
    return http.post('auth/login', data || {});
  },
};
