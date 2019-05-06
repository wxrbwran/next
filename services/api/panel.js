import http from '../http';

export default {
  // 子管理员获取所属一级机构及未分配机构
  role(data) {
    return http.get('panel/role', data || {});
  },
};
